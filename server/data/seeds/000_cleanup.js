// server/data/seeds/000_cleanup.js
exports.seed = async function(knex) {
  // Using .del() is a safer alternative to .truncate() that respects foreign keys.
  // Delete from tables in reverse order of creation.
  
  // 1. Delete from the 'child' table first.
  await knex('saved_properties').del();
  
  // 2. Then delete from the 'parent' tables.
  await knex('properties').del();
  await knex('users').del();
};