const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');

router.post('/profile/:username');

module.exports = router;
