/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products_orders').del()
  await knex('products_orders').insert([
    {
      id: 1, 
      product_id: 2,
      order_id: 1,
      quantity: 1,
    },
    {
      id: 2, 
      product_id: 3,
      order_id: 1,
      quantity: 2,
    },
  ]);
};
