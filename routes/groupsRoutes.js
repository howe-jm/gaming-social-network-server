const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  createGroup,
  getGroups,
  getGroup
} = require('../controllers/groupsController');
const uploadImage = require('../services/imagesService');

router.get('/', passport.authenticate('jwt', { session: false }), getGroups);
router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  getGroup
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploadImage.single('image'),
  createGroup
);

module.exports = router;
