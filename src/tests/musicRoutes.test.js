const request = require('supertest');
const app = require('./testServer');

describe('GET /music', () => {
    it('should return an array of music data', async () => {
      const res = await request(app).get('/music');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });
});
