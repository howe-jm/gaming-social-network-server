const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadImage = require('../services/imagesService');
const {
  createGroup,
  getGroups,
  getGroup
} = require('../controllers/groupsController');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadImage.single('image'),
  createGroup
);

router.get('/', passport.authenticate('jwt', { session: false }), getGroups);
router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  getGroup
);

module.exports = router;
