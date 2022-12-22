/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('orders').del()
  await knex('orders').insert([
    {
      id: 1, 
      user_id: 1,
      status: 'delivered',
      total: 33.97,
      is_payment: false,
      delivery: 'delivery'
    },
  ]);
};
