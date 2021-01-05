const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createComment } = require('../controllers/commentsController');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createComment
);

module.exports = router;
