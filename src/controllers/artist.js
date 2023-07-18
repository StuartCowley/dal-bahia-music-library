const db = require('../db');

const createArtist = async (req, res) => {
  try {
    const { name, genre } = req.body;
    const insertQuery = `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`;
    const values = [name, genre];
    const {
      rows: [newArtist],
    } = await db.query(insertQuery, values);
    res.status(201).json(newArtist);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the artist.' });
  }
};

const readAllArtists = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while reading artists.' });
  }
};

const readArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM Artists WHERE id = $1';
    const { rows } = await db.query(query, [id]);

    if (!rows[0]) {
      res.status(404).json({ message: `artist ${id} does not exist` });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the artist.' });
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;
  let query, params;

  if (name && genre) {
    query =
      'UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *';
    params = [name, genre, id];
  } else if (name) {
    query = 'UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *';
    params = [name, id];
  } else if (genre) {
    query = 'UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *';
    params = [genre, id];
  }

  try {
    const {
      rows: [artist],
    } = await db.query(query, params);
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(artist);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the artist.' });
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  const values = [id];
  try {
    const { rows } = await db.query(
      'DELETE FROM Artists WHERE id = $1 RETURNING *',
      values
    );
    if (!rows.length) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the artist' });
  }
};

module.exports = {
  createArtist,
  readAllArtists,
  readArtistById,
  updateArtist,
  deleteArtist,
};
