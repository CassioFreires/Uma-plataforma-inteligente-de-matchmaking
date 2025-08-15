/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('skills', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable()
        table.string('description').notNullable();

        table.integer('category_id').unsigned().notNullable()
            .references('id').inTable('skill_categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('deleted_at').nullable();

        table.unique(['name', 'category_id']); // Evita skill duplicada na mesma categoria
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
return knex.schema.dropTableIfExists('skills');
};
