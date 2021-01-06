const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getFavGames, addGame, removeGame } = require('../controllers/commentsController');

router.post('/', passport.authenticate('jwt', { session: false }), addGame);

router.delete('/', passport.authenticate('jwt', { session: false }), removeGame);

router.get('/', passport.authenticate('jwt', { session: false }), getFavGames);

module.exports = router;
