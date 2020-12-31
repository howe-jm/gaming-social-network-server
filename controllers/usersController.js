'use strict';
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {
    insertUser,
    getUserIdByName,
    getUserProfile,
    getProfileByUsername,
} = require('../services/usersService');

exports.createUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ success: false, errors: errors.array() });
        }

        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await insertUser(email, username, hashedPassword);

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            JWT_SECRET
        );

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Failed to create user' }],
        });
    }
};

exports.getProfileByUsername = async (req, res) => {
    try {
        const user_id = await getUserIdByName(req.params.username);
        const profile = await getUserProfile(user_id.id);

        if (!profile) {
            return res.status(400).json({
                success: false,
                errors: [{ msg: 'Could not get profile' }],
            });
        }

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            errors: [{ msg: 'Server error: Could not get profile' }],
        });
    }
};
