/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => {
    return knex.schema.createTable('admins', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.integer('role_id').unsigned();
        table.foreign('role_id').references('roles.id');
        table.string('password_reset_token');
        table.date('password_reset_expires');
        table.timestamps(true, true);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('admins');
