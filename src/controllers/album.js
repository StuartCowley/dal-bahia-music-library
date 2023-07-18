const db = require('../db');

const createAlbum = async (req, res) => {
  const { artistId } = req.params;
  const { name, year } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
      [name, year, artistId]
    );
    res.status(201).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the album.' });
  }
};

const readAllAlbums = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while reading albums.' });
  }
};

const readAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM Albums WHERE id = $1';
    const { rows } = await db.query(query, [id]);

    if (!rows[0]) {
      res.status(404).json({ message: `Album ${id} does not exist` });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the album.' });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year, artistid } = req.body;

  const updates = [];
  const params = [id];

  if (name) {
    updates.push(`name = $${params.length + 1}`);
    params.push(name);
  }

  if (year) {
    updates.push(`year = $${params.length + 1}`);
    params.push(year);
  }

  if (artistid) {
    updates.push(`artistid = $${params.length + 1}`);
    params.push(artistid);
  }

  if (!updates.length) {
    return res
      .status(400)
      .json({ message: 'No valid fields provided for update.' });
  }

  const query = `UPDATE Albums SET ${updates.join(
    ', '
  )} WHERE id = $1 RETURNING *`;

  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `Album ${id} does not exist.` });
    }

    res.status(200).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the album.' });
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const values = [id];
  try {
    const { rows } = await db.query(
      'DELETE FROM Albums WHERE id = $1 RETURNING *',
      values
    );
    if (!rows.length) {
      return res.status(404).json({ message: `Album ${id} does not exist.` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the album' });
  }
};

module.exports = {
  createAlbum,
  readAllAlbums,
  readAlbumById,
  updateAlbum,
  deleteAlbum,
};
