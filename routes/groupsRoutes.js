const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createGroup, getGroups, filterGroups, getGroup } = require('../controllers/groupsController');

router.post('/', passport.authenticate('jwt', { session: false }), createGroup);
router.get('/', passport.authenticate('jwt', { session: false }), getGroups);
router.get('/filter', passport.authenticate('jwt', { session: false }), filterGroups);
router.get('/:slug', passport.authenticate('jwt', { session: false }), getGroup);

module.exports = router;
