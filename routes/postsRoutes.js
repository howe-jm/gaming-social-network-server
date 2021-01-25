const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    createPost,
    getUserPosts,
    getPostComments,
    getAllPosts,
} = require('../controllers/postsController');

router.get('/', passport.authenticate('jwt', { session: false }), getUserPosts);
router.post('/', passport.authenticate('jwt', { session: false }), createPost);
router.get(
    '/allPosts',
    passport.authenticate('jwt', { session: false }),
    getAllPosts
);
router.get(
    '/comments/:entityId',
    passport.authenticate('jwt', { session: false }),
    getPostComments
);

module.exports = router;
