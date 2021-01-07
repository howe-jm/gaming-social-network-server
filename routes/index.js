/* eslint-disable indent */
'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API for Gaming Social Network',
    });
});

module.exports = router;
