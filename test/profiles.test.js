const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

describe('PATCH /:username', () => {
  it('Should update user profile and respond with updated profile.', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
  });
});

describe('POST /:username/images', () => {
  it('Should upload and respond with an image', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
  });
});

describe('GET /:username/images', () => {
  it('Should get the images for the user', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
  });
});

describe('PATCH /update/image', () => {
  it('Should update the user profile image', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
  });
});
