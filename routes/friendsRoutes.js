const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  getAllCurrentFriends,
  getAllPendingRequests,
  getAllSentRequests,
  deleteFriend,
  acceptAFriend,
  declineAFriend,
  sendFriendRequest,
} = require('../controllers/friendsController');
const { requestFriend } = require('../services/friendsService');

//GET /friends - gets all friends associated with the user
// @GET /friends/requests - gets all pending friend requests a user has received
// @DELETE /friends/:friendId - deletes a friend request
// @PATCH /friends/:friendId - accepts a friend request updating `pending` to false meaning they are now friends

router.get('/', passport.authenticate('jwt', { session: false }), getAllCurrentFriends);

//get received requests
router.get(
  '/requests',
  passport.authenticate('jwt', {
    session: false,
  }),
  getAllPendingRequests
);

//get sent requests
router.get(
  '/sent',
  passport.authenticate('jwt', {
    session: false,
  }),
  getAllSentRequests
);
router.delete(
  '/deleteFriend',
  passport.authenticate('jwt', {
    session: false,
  }),
  deleteFriend
);

router.delete(
  '/acceptFriend',
  passport.authenticate('jwt', {
    session: false,
  }),
  acceptAFriend
);

router.delete(
  '/declineFriend',
  passport.authenticate('jwt', {
    session: false,
  }),
  declineAFriend
);

router.post(
  '/request',
  passport.authenticate('jwt', {
    session: false,
  }),
  sendFriendRequest
);

module.exports = router;
