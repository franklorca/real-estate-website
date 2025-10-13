// server/data/migrations/..._add_details_to_properties.js
exports.up = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.text('description'); // For long-form text
    tbl.jsonb('image_gallery'); // For storing an array of image URLs
  });
};

exports.down = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.dropColumn('description');
    tbl.dropColumn('image_gallery');
  });
};