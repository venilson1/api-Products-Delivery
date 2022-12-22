/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.enu('status', ['Pending', 'Received', 'Producing', 'Sent', 'Delivered']).defaultTo('Pending', options={});
        table.decimal('total');
        table.boolean('is_payment').defaultTo(false);
        table.enu('delivery', ['Balcony', 'Delivery']);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('orders');
