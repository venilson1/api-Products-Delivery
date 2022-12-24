/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      id: 1, 
      name: 'Coca Cola 2L', 
      description: 'rowValue1', 
      price: 13.99, 
      active: true, 
      path: 'rowValue1', 
      category_id: 1
    },
    {
      id: 2, 
      name: 'Hambuguer X-salada 2.0', 
      description: 'rowValue2', 
      price: 23.99, 
      active: true, 
      path: 'rowValue2', 
      category_id: 2
    },
    {
      id: 3, 
      name: 'Água 500ml', 
      description: 'rowValue3', 
      price: 4.99, 
      active: true, 
      path: 'rowValue3', 
      category_id: 1
    }
  ]);
};
