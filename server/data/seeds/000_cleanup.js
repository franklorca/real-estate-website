// server/data/seeds/000_cleanup.js
exports.seed = async function (knex) {
  // We must disable foreign key checks to truncate tables in any order.
  // This is a common pattern for resetting a database.

  // For PostgreSQL, we can't disable constraints easily in a transaction,
  // so we will truncate in the correct order and use CASCADE.

  // Truncate tables in reverse order of dependency
  // 'saved_properties' depends on 'users' and 'properties'
  await knex("saved_properties").truncate();

  // 'properties' depends on 'agents'
  // We must use .raw() for CASCADE to work across tables.
  await knex.raw("TRUNCATE TABLE properties RESTART IDENTITY CASCADE");

  // 'users' and 'agents' are parent tables.
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  await knex.raw("TRUNCATE TABLE agents RESTART IDENTITY CASCADE");
};
