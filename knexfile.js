const path = require('path');

module.exports = {

  user_test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'app/tests/unitarios/user/test.sqlite'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'app/tests/unitarios/user/migrations'),
    },
  },
};
