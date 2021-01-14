const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

// login to userA to get all current friends
// login to userA to get all pending requests

// create 2 users
// UserA send friend request to UserB
// login to UserB
// UserB delete a friend
// UserB accept a friend


describe('/friends', () => {
    it('/friends should verify token and return all current friends', async () => {
        await dropTables();
        await createTables();
        const { token } = await createUser({
            username: 'dariss',
            email: 'dariss@example.com',
            password: 'pass123word'
        });
        const { body } = await request(app)
            .get('/friends')
            .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
            .expect(200);
    })

    it('/requests should return all pending requests', async () => {
        await dropTables();
        await createTables();
        const { token } = await createUser({
          username: "darriss",
          email: "darriss@example.com",
          password: "pass123word",
        });
        const { body } = await request(app)
            .get('/friends/requests')
            .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
            .expect(200);
    })
})