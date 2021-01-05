const express = require('express');
const router = express.Router();
const passport = require('passport');
const { createGroup } = require('../controllers/groupsController');

router.post('/', passport.authenticate('jwt', { session: false }), createGroup);

module.exports = router;
