/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, name: 'Admin', slug: 'adm'},
    {id: 2, name: 'Employer', slug: 'emp'},
    {id: 3, name: 'User', slug: 'usr'}
  ]);
};
