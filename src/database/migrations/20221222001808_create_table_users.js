/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('address').notNullable();
    table.string('complement').nullable();
    table.string('reference_point').nullable();
    table.string('email').notNullable().unique();
    table.string('cpf', 11).notNullable().unique();
    table.string('password').notNullable();
    table.string('cell_phone').notNullable().unique();
    table.integer('role_id').unsigned().nullable();
    table.foreign('role_id').references('roles.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.string('password_reset_token').nullable();
    table.date('password_reset_expires').nullable();
    table.timestamps(true, true);
    table.dateTime('deleted_at').defaultTo(null);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTable('users');
};
