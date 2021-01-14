const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const { login } = require('../controllers/authController');
const uploadImage = require('../services/imagesService');

router.post('/profile/:username');
router.patch('/update/image', uploadImage.single('image'), (req, res) => {
  res.json({
    success: true,
    imageURL: req.file.location
  });
});

module.exports = router;
