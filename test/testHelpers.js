const request = require('supertest');
const Postgrator = require('postgrator');
const postgratorConfig = require('../postgrator-config');
const app = require('../app');
const postgrator = new Postgrator(postgratorConfig);

exports.createUser = async ({ username, email, password }) => {
  try {
    const res = await request(app).post('/users').send({ username, email, password }).set('Accept', 'application/json');
    return {
      username: res.body.user.username,
      email: res.body.user.email,
      password,
      token: res.body.token,
    };
  } catch (err) {
    console.log(err);
  }
};

// exports.createComment = async ({ entity_id, user_id, comment_text }) => {
//   try {
//     const res = await request(app)
//       .post('/comments')
//       .send({ entity_id, user_id, comment_text })
//       .set('Accept', 'application/json');
//     return {
//       entity_id: res.body.entity_id,
//       user_id: res.body.user_id,
//       comment_text: res.body.comment_text,
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.dropTables = async () => {
  try {
    return await postgrator.migrate('0');
  } catch (err) {
    console.log(err);
  }
};

exports.createTables = async () => {
  try {
    return await postgrator.migrate();
  } catch (err) {
    console.log(err);
  }
};
