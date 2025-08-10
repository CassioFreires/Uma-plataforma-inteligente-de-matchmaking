/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('permissions', (table) => {
    table.increments('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();

    table.dateTime('create_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('update_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('delete_at').nullable()
  } )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('permissions')
};
