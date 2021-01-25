const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

describe('/users should post a new user', () => {
  it('/users should post a new user', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dariss',
      email: 'dariss@example.com',
      password: 'pass123word',
    });
    const { body } = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(400);
  });
});

describe('/users/:username should return user by id', () => {
  it('/users/:username should return user by id', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dariss',
      email: 'dariss@example.com',
      password: 'pass123word',
    });
    const { body } = await request(app)
      .get('/users/dariss')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });
});

describe('/users/search should search for usernames matching the search term', () => {
  it('should return all usernames containing the search term regardless of case', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'MatchName',
      email: 'matchname@example.com',
      password: 'pass123word',
    });
    await createUser({
      username: 'UnexactMatchNamePass',
      email: 'notmatchname@example.com',
      password: 'pass123word',
    });
    await createUser({
      username: 'nopassname',
      email: 'unmatchingusername@example.com',
      password: 'pass123word',
    });

    const { body } = await request(app)
      .get('/users/search')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .query({ searchTerm: 'matchname' })
      .expect(200)
      .expect((res) => {
        expect(res.body.users[0].id).to.eql('1');
        expect(res.body.users[1].id).to.eql('2');
        expect(res.body.users[0].username).to.eql('MatchName');
        expect(res.body.users[1].username).to.eql('UnexactMatchNamePass');
      });
  });
});
