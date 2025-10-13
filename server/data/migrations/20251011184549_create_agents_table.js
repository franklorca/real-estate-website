// server/data/migrations/..._create_agents_table.js
exports.up = function(knex) {
  return knex.schema.createTable('agents', tbl => {
    tbl.increments('id').primary();
    tbl.string('name').notNullable();
    tbl.string('email').notNullable().unique();
    tbl.string('phone');
    tbl.text('bio');
    tbl.string('profile_picture_url');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('agents');
};