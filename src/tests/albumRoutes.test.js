const request = require('supertest');
const app = require('./testServer');

describe('GET /albums', () => {
    it('should respond with an array of albums', async () => {
      const res = await request(app).get('/albums');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
});