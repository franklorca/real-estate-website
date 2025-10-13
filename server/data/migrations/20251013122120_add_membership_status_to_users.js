// server/data/migrations/..._add_membership_status_to_users.js
exports.up = function (knex) {
  return knex.schema.table("users", (tbl) => {
    // Add the new column. It can't be null and will default to 'pending' for all new users.
    tbl.string("membership_status").notNullable().defaultTo("pending");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (tbl) => {
    // This tells knex how to undo the migration if needed
    tbl.dropColumn("membership_status");
  });
};
