const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    getAllCurrentFriends,
    getAllPendingFriends,
    deleteFriend,
    acceptAFriend,
    sendFriendRequest
} = require('../controllers/friendsController');
const { requestFriend } = require('../services/friendsService');


//GET /friends - gets all friends associated with the user
// @GET /friends/requests - gets all pending friend requests a user has received
// @DELETE /friends/:friendId - deletes a friend request
// @PATCH /friends/:friendId - accepts a friend request updating `pending` to false meaning they are now friends


router.get('/', passport.authenticate('jwt', { session: false}), getAllCurrentFriends);


router.get(
    '/',
    passport.authenticate('jwt', {
        session: false,
    }),
    getAllCurrentFriends
);
router.get(
    '/requests',
    passport.authenticate('jwt', {
        session: false,
    }),
    getAllPendingFriends
);
router.delete(
    '/:friendId',
    passport.authenticate('jwt', {
        session: false,
    }),
    deleteFriend
);

router.patch(
    '/:friendId',
    passport.authenticate('jwt', {
        session: false,
    }),
    acceptAFriend
);

router.post(
    '/request',
    passport.authenticate('jwt', {
        session: false,
    }),
    sendFriendRequest
);

module.exports = router;