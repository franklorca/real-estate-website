// inside server/data/migrations/...._create_properties_table.js
exports.up = function(knex) {
  return knex.schema.createTable('properties', tbl => {
    tbl.increments('id').primary();
    tbl.string('title', 255).notNullable();
    tbl.string('city', 128).notNullable();
    tbl.decimal('price', 14, 2).notNullable(); // For storing money values
    tbl.integer('bedrooms').unsigned().notNullable();
    tbl.integer('bathrooms').unsigned().notNullable();
    tbl.string('image').notNullable();
    // We can add more fields like description, square_feet, etc. later
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('properties');
};