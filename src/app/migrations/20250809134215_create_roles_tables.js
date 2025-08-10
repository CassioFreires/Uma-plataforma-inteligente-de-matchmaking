/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('roles', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable(),
    table.string('description', 300).notNullable(),

    table.integer('permission')

    table.dateTime('create_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('update_at').defaultTo(knex.fn.now()).notNullable();
    table.dateTime('delete_at').nullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles')
};
