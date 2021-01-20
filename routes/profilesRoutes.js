const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const { login } = require('../controllers/authController');
const uploadImage = require('../services/imagesService');
const {
    updateUserProfileBio,
    getAllUserImages,
    postImage,
} = require('../controllers/profilesController');

//route to patch user bio
router.patch('/:username', bodyParser.json(), updateUserProfileBio);

//routes to get and post images
router.get('/:username/images', bodyParser.json(), getAllUserImages);
router.post('/:username/images', bodyParser.json(), postImage);

router.patch('/update/image', uploadImage.single('image'), (req, res) => {
    res.json({
        success: true,
        imageURL: req.file.location,
    });
});

module.exports = router;
