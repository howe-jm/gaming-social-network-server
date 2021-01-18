const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

describe('/groups', () => {
  it('/should GET groups', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newGroup = {
      group_name: '1',
      slug: '1',
    };
    const { body } = await request(app)
      .post('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newGroup);
    const { groupBody } = await request(app)
      .get('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.groups[0].group_name).to.eql(newGroup.group_name);
        expect(res.body.groups[0].slug).to.eql(newGroup.slug);
        expect(res.body.groups[0]).to.have.property('id');
      });
  });
  it('/should CREATE a group', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newGroup = {
      group_name: '1',
      slug: '1',
    };
    const { body } = await request(app)
      .post('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newGroup)
      .expect(200)
      .expect((res) => {
        expect(res.body.group.group_name).to.eql(newGroup.group_name);
        expect(res.body.group.slug).to.eql(newGroup.slug);
        expect(res.body.group).to.have.property('id');
      });
  });
});

describe.only('/groups/filter', () => {
  it('/should GET filtered groups', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'darriss',
      email: 'darriss@example.com',
      password: 'pass123word',
    });

    const newGroup = {
      group_name: 'unmatched test group',
      slug: '1',
    };
    const newGroupTwo = {
      group_name: 'League of Legends',
      slug: '1',
    };
    const newGroupThree = {
      group_name: 'Apex Legends',
      slug: '1',
    };
    const { body } = await request(app)
      .post('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newGroup);
    const { bodyTwo } = await request(app)
      .post('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newGroupTwo);
    const { bodyThree } = await request(app)
      .post('/groups')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newGroupThree);
    const { groupBody } = await request(app)
      .get('/groups/filter')
      .query({ searchTerm: 'Legends' })
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      });
  });
});
