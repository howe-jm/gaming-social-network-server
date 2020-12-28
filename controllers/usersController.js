const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // @TODO - insert user into DB here
    // should look something like this probably
    // const user = await somethingService.insertUser(email, username, hashedPassword);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      JWT_SECRET
    );

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: [{ msg: 'Server error: Failed to create user' }]
    });
  }
};
