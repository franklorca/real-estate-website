// server/knexfile.js
require('dotenv').config(); // Make sure to load environment variables

module.exports = {
  development: {
    client: 'pg', // Change client to 'pg'
    connection: process.env.DATABASE_URL, // Use the environment variable
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};