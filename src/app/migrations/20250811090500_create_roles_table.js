exports.up = function(knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('description', 300).notNullable();

    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles');
};
