const { NODE_ENV, TEST_DATABASE_URL, LOCAL_DATABASE_URL } = require('./config');

module.exports = {
  migrationDirectory: 'migrations',
  driver: 'pg',
  // switch the last part to DATABASE_URL before launching to production
  connectionString: NODE_ENV === 'test' ? TEST_DATABASE_URL : LOCAL_DATABASE_URL
};
