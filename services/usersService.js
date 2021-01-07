const db = require('../knex/knex');

exports.insertUser = async (email, username, hashedPassword) => {
  const user = (
    await db('users')
      .insert({ email, username, password: hashedPassword })
      .returning('*')
  )[0];
  await db('profiles').insert({ user_id: user.id });
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

exports.getUserIdByName = async (username) => {
  try {
    const id = await db('users').where({ username }).select('id').first();
    return id;
  } catch (err) {
    throw Error('Username does not exist');
  }
};

exports.getUserProfile = (userId) => {
  console.log(userId);
  return db('profiles').where('user_id', userId).first();
};
