const request = require('supertest');
const app = require('./testServer');

describe('GET /playlists', () => {
    it('should return an array of playlists data', async () => {
      const res = await request(app).get('/playlists');
      expect(res.statusCode).toBe(200); // Change to expected status code
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
});