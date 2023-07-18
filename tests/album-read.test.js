const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Read Albums', () => {
  let albums;
  let artists;

  beforeEach(async () => {
    const artistResponses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
        ['Artist 1', 'Genre 1']
      ),
      db.query(
        'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
        ['Artist 2', 'Genre 2']
      ),
      db.query(
        'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
        ['Artist 3', 'Genre 3']
      ),
    ]);

    artists = artistResponses.map(({ rows }) => rows[0]);

    const albumResponses = await Promise.all([
      db.query(
        'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
        ['Album 1', 2023, artists[0].id]
      ),
      db.query(
        'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
        ['Album 2', 2022, artists[1].id]
      ),
      db.query(
        'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
        ['Album 3', 2021, artists[0].id]
      ),
    ]);

    albums = albumResponses.map(({ rows }) => rows[0]);
  });

  describe('GET /albums', () => {
    it('returns all albums in the database', async () => {
      const { status, body } = await request(app).get('/albums').send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumRecord) => {
        const expected = albums.find((album) => album.id === albumRecord.id);
        expect(albumRecord).to.deep.equal(expected);
      });
    });
  });

  describe('GET /albums/{id}', () => {
    it('returns the album with the correct id', async () => {
      const { status, body } = await request(app)
        .get(`/albums/${albums[0].id}`)
        .send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(albums[0]);
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .get('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('Album 999999999 does not exist');
    });
  });
});
