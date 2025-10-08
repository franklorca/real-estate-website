// server/knexfile.js
require('dotenv').config({ path: './.env' }); // Ensures we can load the .env file

module.exports = {
  // This is the configuration for our live production environment on Render
  development: { // Render uses the 'development' environment by default
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