exports.up = function(knex) {
  return knex.schema.createTable('blogs', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('slug').notNullable().unique();
    table.text('excerpt');
    table.text('content').notNullable();
    table.string('cover_image_url');
    table.string('author').defaultTo('Luminous Heaven');
    table.datetime('published_at');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('blogs');
};
