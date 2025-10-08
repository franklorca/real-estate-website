// server/data/migrations/..._create_saved_properties_table.js
exports.up = function(knex) {
  return knex.schema.createTable('saved_properties', tbl => {
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE') // If a user is deleted, their saved records are also deleted
      .onUpdate('CASCADE');

    tbl.integer('property_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('properties')
      .onDelete('CASCADE') // If a property is deleted, saved records are also deleted
      .onUpdate('CASCADE');

    // Create a composite primary key to prevent a user from saving the same property twice
    tbl.primary(['user_id', 'property_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('saved_properties');
};