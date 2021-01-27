const db = require('../knex/knex');

exports.getUserByEmail = async (email) => {
  try {
    const user = await db('users').where({ email: email.toLowerCase() }).first();
    return user;
  } catch (err) {
    throw new Error('Cannot find user with email');
  }
};
