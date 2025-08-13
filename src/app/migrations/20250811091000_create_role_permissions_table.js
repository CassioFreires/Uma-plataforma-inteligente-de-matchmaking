/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('role_permissions', (table) => {
        table.increments('id').primary();

        table.integer('role_id').unsigned().notNullable()
            .references('id').inTable('roles')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('permission_id').unsigned().notNullable()
            .references('id').inTable('permissions')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.unique(['role_id', 'permission_id']); // evita duplicidade

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('role_permissions')
};
