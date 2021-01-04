'use strict';
require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
};
