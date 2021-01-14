const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const { updateUserProfileBio } = require('../controllers/profilesController');

router.patch('/:username', bodyParser.json(), updateUserProfileBio);

module.exports = router;
