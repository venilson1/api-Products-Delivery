require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/src/database/migrations`
      },
      seeds: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/src/database/seeds`
      }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    },
  }

};
