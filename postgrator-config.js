const { NODE_ENV, TEST_DATABASE_URL, LOCAL_DATABASE_URL, DATABASE_URL } = require('./config');

module.exports = {
  migrationDirectory: 'migrations',
  driver: 'pg',
  connectionString:
    NODE_ENV === 'test' ? TEST_DATABASE_URL : NODE_ENV === 'development' ? LOCAL_DATABASE_URL : DATABASE_URL,
};
