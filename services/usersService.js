const db = require('../knex/knex');

exports.insertUser = async (email, username, hashedPassword) => {
  const user = (await db('users').insert({ email, username, password: hashedPassword }).returning('*'))[0];
  return user;
};

exports.deleteUser = (id) => {
  return db('users').where({ id }).delete();
};

exports.updateUser = (id, updatedUser) => {
  return db('users')
    .where({ id })
    .update(updatedUser)
    .returning('*')
    .then((rows) => rows[0]);
};

exports.getUserByName = (username) => {
  return db('users').select('id').where('username', username).first();
};

exports.getUserProfile = (userId) => {
  return db('profiles').where('user_id', userId).first();
};
