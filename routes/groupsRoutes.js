const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createGroup, getGroups, filterGroups } = require('../controllers/groupsController');

router.post('/', passport.authenticate('jwt', { session: false }), createGroup);

router.get('/', passport.authenticate('jwt', { session: false }), getGroups);

router.get('/filter', passport.authenticate('jwt', { session: false }), filterGroups);

module.exports = router;
