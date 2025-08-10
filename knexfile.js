const path = require('path');
require('dotenv').config();

const migrationsDir = path.resolve(__dirname, 'src/app/migrations');
const seedersDir = path.resolve(__dirname, 'src/app/seeds');

console.log('--------------------' + seedersDir);

module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: process.env.DB_URL_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: migrationsDir,
    },
    seeders: {
      directory: seedersDir,
    },
    debug: true,
  },
  // outras configurações...
};
