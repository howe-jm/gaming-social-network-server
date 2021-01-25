const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const bodyParser = require('body-parser');
const { login } = require('../controllers/authController');
const uploadImage = require('../services/imagesService');
const {
    updateUserProfileBio,
    updateUserProfileBanner,
    updateUserProfileImage,
    updatePreferredHardware,
    getAllUserImages,
    postImage,
} = require('../controllers/profilesController');

//route to patch user bio
router.patch('/:username', bodyParser.json(), updateUserProfileBio);
router.patch('/:username/banner', bodyParser.json(), updateUserProfileBanner);
router.patch(
    '/:username/profileImage',
    bodyParser.json(),
    updateUserProfileImage
);

//route to patch user hardware
router.patch('/:username/hardware', bodyParser.json(), updatePreferredHardware);
//routes to get and post images
router.get('/:username/images', bodyParser.json(), getAllUserImages);
router.post('/:username/images', bodyParser.json(), postImage);

router.patch('/update/image', uploadImage.single('image'), (req, res) => {
    console.log(req);
    res.json({
        success: true,
        imageURL: req.file.location,
    });
});

module.exports = router;
