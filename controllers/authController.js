const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { JWT_SECRET } = require('../config');
const { getUserByEmail } = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(401)
                .json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                errors: [{ msg: 'Invalid email or password' }],
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                errors: [{ msg: 'Invalid email or password' }],
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            JWT_SECRET
        );

        res.json({
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
            errors: [{ msg: 'Server error: Failed to login user' }],
        });
    }
};
