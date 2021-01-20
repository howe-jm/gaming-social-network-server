const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

describe('/favorites', () => {
  it('/should get favorite games', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newFavorite = {
      game_id: '1',
      game: { testDescription: 'testing the name and game' },
    };
    await request(app)
      .post('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newFavorite);
    const { body } = await request(app)
      .get('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.favorites[0].testDescription).to.eql(newFavorite.game.testDescription);
      });
  });
  it('/should POST a new favorite game', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newFavorite = {
      game_id: '1',
      game: { testDescription: 'testing the name and game' },
    };
    await request(app)
      .post('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newFavorite)
      .expect(200)
      .expect((res) => {
        expect(res.body.game.game_json.testDescription).to.eql(newFavorite.game.testDescription);
      });
  });
});

describe('/favorites/:gameId', () => {
  it('/favorites/:gameId should delete game', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'michelle',
      email: 'michelle@example.com',
      password: 'pass456word',
    });
    const newFavorite = {
      game_id: '1',
      game: { testDescription: 'testing the name and game' },
    };
    await request(app)
      .post('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newFavorite);
    const { body } = await request(app)
      .delete('/favorites/1')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200);
  });
});
