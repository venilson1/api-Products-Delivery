/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products_orders', table => {
        table.increments('id');
        table.integer('product_id').unsigned().nullable();
        table.foreign('product_id').references('products.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('order_id').unsigned().nullable();
        table.foreign('order_id').references('orders.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('quantity').unsigned().nullable();;
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('products_orders');