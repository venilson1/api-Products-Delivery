const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile['developement']);

module.exports = knex;