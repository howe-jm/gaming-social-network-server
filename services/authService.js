const db = require('../knex/knex');

<<<<<<< HEAD
exports.addUser = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: '' }],
    });
  }
=======
exports.getUserByEmail = async (email) => {
  const user = await db('users').where({ email: email.toLowerCase() }).first();
  return user;
>>>>>>> 6bd123df5facde526cf30056c873f296b36a0b72
};
