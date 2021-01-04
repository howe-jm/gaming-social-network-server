const express = require('express');
const router = express.Router();
const passport = require('passport');
const { v4: uuid } = require('uuid');
// const { createPost, getUserPosts } = require('../controllers/postsController');

// router.get('/', passport.authenticate('jwt', { session: false }), getUserPosts);
// router.post('/', passport.authenticate('jwt', { session: false }), createPost);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      posts: [
        {
          entity_id: uuid(),
          user_id: 1,
          username: 'darissdev',
          post_text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          entity_id: uuid(),
          user_id: 1,
          username: 'darissdev',
          post_text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          entity_id: uuid(),
          user_id: 1,
          username: 'darissdev',
          post_text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ]
    });
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      post: {
        entity_id: uuid(),
        user_id: req.user.id,
        username: 'darissdev',
        post_text: req.body.text
      }
    });
  }
);

module.exports = router;
