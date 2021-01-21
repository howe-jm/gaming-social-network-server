const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

describe('/friends', () => {
  it('/friends should verify token and return all current friends', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dariss',
      email: 'dariss@example.com',
      password: 'pass123word',
    });
    const { body } = await request(app)
      .get('/friends')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });

  it('/requests should return all pending requests', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });
    const { body } = await request(app)
      .get('/friends/requests')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });

  it('/requests should send friend request', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const { id } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: 'supersecurepassword',
    });

    const newRequest = {
      user_b: '2',
      message: 'Test friend request message',
    };
    const { body } = await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body.request.user_b).to.eql(newRequest.user_b);
        expect(res.body.request.msg).to.eql(newRequest.message);
        expect(res.body.request).to.have.property('friends_id');
      });
  });
});

describe('/friends/:friendId', () => {
  it('/friends/:friendId should delete friend', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'michelle',
      email: 'michelle@example.com',
      password: 'pass456word',
    });
    const { body } = await request(app)
      .delete('/friends/:friendId')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });

  it('/friends/:friendId should accept friend', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'michelle',
      email: 'michelle@example.com',
      password: 'pass456word',
    });
    const { body } = await request(app)
      .patch('/friends/:friendId')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(500);
  });
});
