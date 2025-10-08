// server/knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './luminous_heaven.db3' // The name of our database file
    },
    useNullAsDefault: true, // Required for SQLite
    migrations: {
      directory: './data/migrations' // Where we will store schema changes
    },
    seeds: {
      directory: './data/seeds' // Where we will store initial data
    }
  }
};