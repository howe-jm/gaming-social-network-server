const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

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

    const { body } = await request(app)
      .patch('/profiles/dom')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(updatedBio)
      .expect(200)
      .expect((res) => {
        expect(res.body.profile.user_bio).to.eql(updatedBio.user_bio);
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
    const newImage = {
      user_id: '1',
      imageURL: './testAssets/test.jpg',
    };

    const { body } = await request(app)
      .post('/profiles/dom/images')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newImage)
      .expect(200)
      .expect((res) => {
        expect(res.body.images[0].image_url).to.eql(newImage.imageURL);
        expect(res.body.images[0]).to.have.property('id');
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

    const newImage = {
      user_id: '1',
      imageURL: './testAssets/test.jpg',
    };

    await request(app)
      .post('/profiles/dom/images')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newImage);

    const { body } = await request(app)
      .get('/profiles/dom/images')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.images[0].image_url).to.eql(newImage.imageURL);
      });
  });
});

// describe.only('PATCH /update/image', () => {
//   it('Should update the user profile image', async () => {
//     await dropTables();
//     await createTables();
//     const { token } = await createUser({
//       username: 'dom',
//       email: 'dom@example.com',
//       password: '123456',
//     });
//     const { body } = await request(app)
//       .patch('/profiles/update/image')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .attach('image', './testAssets/test.jpg')
//       .expect(200)
//       .expect((res) => console.log(res.body));
//   });
// });
