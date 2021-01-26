const {
  DATABASE_URL,
  TEST_DATABASE_URL,
  LOCAL_DATABASE_URL
} = require('./config');

module.exports = {
  development: {
    client: 'pg',
    connection: LOCAL_DATABASE_URL,
    ssl: true
  },
  production: {
    client: 'pg',
    connection: DATABASE_URL,
    ssl: true
  },
  test: {
    client: 'pg',
    connection: TEST_DATABASE_URL,
    ssl: true
  }
};
