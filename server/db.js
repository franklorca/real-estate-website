// server/db.js
const knex = require('knex');
const knexConfig = require('./knexfile.js');

// We use 'development' since that's what we defined in knexfile
const db = knex(knexConfig.development);

module.exports = db;