const db = require('../knex/knex');

exports.addUser = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      errors: [{ msg: '' }],
    });
  }
};
