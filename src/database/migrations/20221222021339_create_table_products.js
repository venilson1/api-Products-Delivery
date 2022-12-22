/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.decimal('price').notNullable();
        table.boolean('promotion').notNullable();
        table.integer('discount').nullable();
        table.boolean('active').defaultTo(true).notNullable();
        table.string('path').notNullable();
        table.integer('category_id').unsigned();
        table.foreign('category_id').references('categories.id');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('products');
