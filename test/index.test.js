const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');

describe('/', () => {
  it('@GET / should return JSON info about the API', async () => {
    const { body } = await request(app).get('/').set('Accept', 'application/json').expect(200);
    return expect(body).to.eql({
      success: true,
      message: 'API for Gaming Social Network',
    });
  });
});
