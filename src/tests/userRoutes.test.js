const request = require('supertest');
const app = require('./testServer');

describe('GET /users/:userId', () => {
  it('should return user with specific properties', async () => {
    const userId = "65e05d1b41f005f93cc9a5ed";
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});
