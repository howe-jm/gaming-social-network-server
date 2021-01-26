const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  createGroup,
  getGroups,
  getGroup,
  joinGroup,
  leaveGroup,
  getMembers,
  createGroupPost,
  getGroupPosts
} = require('../controllers/groupsController');
const uploadImage = require('../services/imagesService');

router.get('/', passport.authenticate('jwt', { session: false }), getGroups);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadImage.single('image'),
  createGroup
);

router.post(
  '/join',
  passport.authenticate('jwt', { session: false }),
  joinGroup
);

router.delete(
  '/leave',
  passport.authenticate('jwt', { session: false }),
  leaveGroup
);

router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  getGroup
);

router.get(
  '/:id/members',
  passport.authenticate('jwt', { session: false }),
  getMembers
);

router.post(
  '/:id/posts',
  passport.authenticate('jwt', { session: false }),
  createGroupPost
);

router.get(
  '/:id/posts',
  passport.authenticate('jwt', { session: false }),
  getGroupPosts
);

module.exports = router;
