// server/data/migrations/..._update_properties_with_lifestyle_features.js
exports.up = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.string('status').defaultTo('Available');
    tbl.string('listing_type').defaultTo('For Sale');
    tbl.text('video_url');
    tbl.text('floor_plan_url');
    tbl.integer('agent_id').unsigned().references('id').inTable('agents');
  });
};

exports.down = function(knex) {
  return knex.schema.table('properties', tbl => {
    tbl.dropColumn('status');
    tbl.dropColumn('listing_type');
    tbl.dropColumn('video_url');
    tbl.dropColumn('floor_plan_url');
    tbl.dropColumn('agent_id');
  });
};