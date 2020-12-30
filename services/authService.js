const db = require('../knex/knex');

exports.getUserByEmail = async (email) => {
  const user = await db('users').where({ email: email.toLowerCase() }).first();
  return user;
};
