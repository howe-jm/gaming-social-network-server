const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

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

describe('/favorites/userFavorites', () => {
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
      .get('/favorites/userFavorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .query({ userId: 1 })
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

describe('/favorites/count', () => {
  it('should return the number of rows for the game', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newFavorite1 = {
      game_id: '1',
      game: { testDescription: 'testing the name and game' },
    };
    const newFavorite2 = {
      game_id: '1',
      game: { testDescription: 'testing the name and game' },
    };

    await request(app)
      .post('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newFavorite1);

    await request(app)
      .post('/favorites')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newFavorite2);

    const { body } = await request(app)
      .get('/favorites/count')
      .query({ gameId: 1 })
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.favoriteCount).to.eql(2);
      });
  });
});
