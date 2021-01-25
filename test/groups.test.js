// const app = require('../app');
// const { expect } = require('chai');
// const request = require('supertest');
// const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

// describe('/groups', () => {
//   it('/should GET groups', async () => {
//     await dropTables();
//     await createTables();
//     const { token } = await createUser({
//       username: 'darriss',
//       email: 'darriss@example.com',
//       password: 'pass123word',
//     });

//     const newGroup = {
//       group_name: '1',
//       slug: '1',
//     };
//     await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroup);
//     const { body } = await request(app)
//       .get('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.groups[0].group_name).to.eql(newGroup.group_name);
//         expect(res.body.groups[0].slug).to.eql(newGroup.slug);
//         expect(res.body.groups[0]).to.have.property('id');
//       });
//   });
//   it('/should CREATE a group', async () => {
//     await dropTables();
//     await createTables();
//     const { token } = await createUser({
//       username: 'darriss',
//       email: 'darriss@example.com',
//       password: 'pass123word',
//     });

//     const newGroup = {
//       group_name: '1',
//       slug: '1',
//     };
//     const { body } = await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroup)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.group.group_name).to.eql(newGroup.group_name);
//         expect(res.body.group.slug).to.eql(newGroup.slug);
//         expect(res.body.group).to.have.property('id');
//       });
//   });
// });

// describe('/groups/filter', () => {
//   it('/should GET filtered groups', async () => {
//     await dropTables();
//     await createTables();
//     const { token } = await createUser({
//       username: 'darriss',
//       email: 'darriss@example.com',
//       password: 'pass123word',
//     });

//     const newGroup = {
//       group_name: 'unmatched test group',
//     };
//     const newGroupTwo = {
//       group_name: 'League of Legends',
//     };
//     const newGroupThree = {
//       group_name: 'Apex Legends',
//     };
//     await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroup);
//     await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroupTwo);
//     await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroupThree);
//     const { body } = await request(app)
//       .get('/groups/filter')
//       .query({ searchTerm: 'Legends' })
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.filteredGroups[0].group_name).to.eql(newGroupTwo.group_name);
//         expect(res.body.filteredGroups[0]).to.have.property('id');
//         expect(res.body.filteredGroups[0]).to.have.property('slug');
//         expect(res.body.filteredGroups[1].group_name).to.eql(newGroupThree.group_name);
//         expect(res.body.filteredGroups[1]).to.have.property('id');
//         expect(res.body.filteredGroups[1]).to.have.property('slug');
//       });
//     return body;
//   });
// });

// describe('/groups/:slug', () => {
//   it('/should GET a group by slug', async () => {
//     await dropTables();
//     await createTables();
//     const { token } = await createUser({
//       username: 'darriss',
//       email: 'darriss@example.com',
//       password: 'pass123word',
//     });
//     const newGroup = {
//       group_name: 'League of Legends',
//     };
//     await request(app)
//       .post('/groups')
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .send(newGroup);

//     const { body } = await request(app)
//       .get('/groups/league-of-legends')
//       .query({ searchTerm: 'Legends' })
//       .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.group.name).to.eql(newGroup.name);
//       });
//   });
// });
