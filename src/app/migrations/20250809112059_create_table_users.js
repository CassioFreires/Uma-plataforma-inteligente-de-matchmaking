/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('users', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('lastname', 100).notNullable();
        table.string('email', 150).unique().notNullable();
        table.string('password_hash', 255).notNullable();

        // Criação da foreign key
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL').onUpdate('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();

        table.index('email');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
