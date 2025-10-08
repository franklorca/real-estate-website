// inside server/data/migrations/...._initial_schema.js
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id').primary();
    tbl.string('name', 128).notNullable();
    tbl.string('email', 128).notNullable().unique();
    tbl.string('password_hash', 255).notNullable();
    tbl.string('role', 64).notNullable().defaultTo('member');
    // We will add stripe columns later
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};