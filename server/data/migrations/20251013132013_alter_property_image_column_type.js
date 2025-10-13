// server/data/migrations/..._alter_property_image_column_type.js
exports.up = function (knex) {
  return knex.schema.table("properties", function (tbl) {
    // Change the 'image' column to type 'text'
    tbl.text("image").alter();
  });
};

exports.down = function (knex) {
  // This defines how to reverse the change
  return knex.schema.table("properties", function (tbl) {
    // Change it back to a string with a 255 limit
    tbl.string("image", 255).alter();
  });
};
