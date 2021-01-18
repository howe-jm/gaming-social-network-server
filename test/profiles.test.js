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
    const updatedBio = {
      user_id: '1',
      user_bio: 'This is a test bio.',
    };
  });
});

describe.only('POST /:username/images', () => {
  it('Should upload and respond with an image', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
    const newImage = {
      user_id: '1',
      imageURL: './testAssets/test.jpg',
    };

    const { body } = await request(app)
      .post('/users/dom/images')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newImage)
      .expect(200)
      .expect((res) => {
        console.log(res);
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
