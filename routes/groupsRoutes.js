const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  createGroup,
  getGroups,
  getGroup
} = require('../controllers/groupsController');

router.post('/', passport.authenticate('jwt', { session: false }), createGroup);
router.get('/', passport.authenticate('jwt', { session: false }), getGroups);
router.get(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  getGroup
);

module.exports = router;
