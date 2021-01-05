const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createPost, getUserPosts } = require('../controllers/postsController');

router.get('/', passport.authenticate('jwt', { session: false }), getUserPosts);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);

module.exports = router;
