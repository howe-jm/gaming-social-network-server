const db = require('../knex/knex');

exports.insertUser = async (email, username, hashedPassword) => {
  const user = (await db('users').insert({ email, username, password: hashedPassword }).returning('*'))[0];
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

exports.getUserProfile = async (userId) => {
  try {
    const userProfile = (
      await db('profiles')
        .where('user_id', userId)
        .join('users', {
          'users.id': 'profiles.user_id',
        })
        .returning('*')
    )[0];
    return userProfile;
  } catch (err) {
    console.log(err);
  }
};

exports.getUserSearch = async (searchTerm) => {
  try {
    let users = await db('users').returning('*');
    let filteredUsers = users;

    serializeUsers = (user) => ({
      id: user.id,
      username: user.username,
    });

    if (searchTerm && searchTerm.trim('').length) {
      const results = filteredUsers.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
      filteredUsers = results;
    }

    return filteredUsers.map((user) => serializeUsers(user));
  } catch (err) {
    console.log(err);
  }
};
