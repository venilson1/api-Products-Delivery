/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      first_name: 'Ana',
      last_name: 'Julia',
      address: 'Rua Valinhos de Moura',
      complement: '1B',
      reference: 'ao Lado da Escola São Simas',
      email: 'ana@gmail.com',
      cpf: '78996654879',
      password: '$2a$12$6jeh5kWap8YtUnXpuAW1quC.FrkYHzcNR6pkLDphlB/9KtChnPLPi', //102030
      telephone: '11959692596',
      role_id: 3,
    },
  ]);
};
