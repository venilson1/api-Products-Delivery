/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admins').del()
  await knex('admins').insert([
    {
      id: 1, 
      name: 'Maria',
      email: 'maria@gmail.com',
      password: '$2a$12$6jeh5kWap8YtUnXpuAW1quC.FrkYHzcNR6pkLDphlB/9KtChnPLPi', //102030
      role_id: 1,
    },
  ]);
};
