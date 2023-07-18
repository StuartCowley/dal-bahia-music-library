const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *',
      ['Tame Impala', 'rock']
    );

    artist = rows[0];
  });

  describe('POST /artists/{id}/albums', () => {
    it('creates a new album in the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'A Wonderful Album',
          year: 2023,
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal('A Wonderful Album');
      expect(body.year).to.equal(2023);

      const {
        rows: [albumData],
      } = await db.query(`SELECT * FROM Albums WHERE artistId = ${artist.id}`);
      expect(albumData.name).to.equal('A Wonderful Album');
      expect(albumData.year).to.equal(2023);
      expect(albumData.artistid).to.equal(artist.id);
    });
  });
});
