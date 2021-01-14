const app = require("../app");
const { expect } = require("chai");
const request = require("supertest");
const { createTables, dropTables, createUser } = require("./testHelpers");

describe('/users should post a new user', () => {
    it('/users should post a new user', async () => {
        await dropTables();
        await createTables();
        const { token } = await createUser({
            username: 'dariss',
            email: 'dariss@example.com',
            password: 'pass123word'
        });
        const { body } = await request(app)
         .post('/users')
         .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
         .expect(400);
    })
});

describe("/users/:username should return user by id", () => {
  it("/users/:username should return user by id", async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: "dariss",
      email: "dariss@example.com",
      password: "pass123word",
    });
    const { body } = await request(app)
      .get("/users/:username")
      .set({ Authorization: `Bearer ${token}`, Accept: "application/json" })
      .expect(500);
  });
});