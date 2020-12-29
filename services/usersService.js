const UsersService = {
  insertNewUser(knex, userData) {
    return knex
      .insert(userData)
      .into('users')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  deleteUser(knex, id) {
    return knex('users').where({ id }).delete();
  },
  changeUser(knex, id, updatedUser) {
    return knex('users')
      .where({ id })
      .update(updatedUser)
      .returning('*')
      .then((rows) => rows[0]);
  },
};

module.exports = UsersService;
