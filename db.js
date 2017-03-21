// http://www.dancorman.com/knex-your-sql-best-friend/
var config      = require('./knexfile.js');  
var env         = 'development';  
var knex        = require('knex')(config);

module.exports = knex;

knex.migrate.latest([config]); 