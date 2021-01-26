const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  getFavorite,
  getFavorites,
  getUserFavorites,
  getTotalFavs,
  addFavorite,
  deleteFavorite,
} = require('../controllers/favoritesController');

router.get('/', passport.authenticate('jwt', { session: false }), getFavorites);
router.get('/userFavorites', passport.authenticate('jwt', { session: false }), getUserFavorites);
router.get('/count', passport.authenticate('jwt', { session: false }), getTotalFavs);
router.get('/:gameId', passport.authenticate('jwt', { session: false }), getFavorite);
router.post('/', passport.authenticate('jwt', { session: false }), addFavorite);
router.delete('/:gameId', passport.authenticate('jwt', { session: false }), deleteFavorite);
module.exports = router;
