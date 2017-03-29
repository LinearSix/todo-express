// HACK: to work around heroku standard plans requiring SSL but not specifying in connection string
// https://github.com/tgriesser/knex/issues/852
if(process.env.DATABASE_URL) {
  var pg = require('pg');
  pg.defaults.ssl = true;
}
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { 
      user: process.env.USER, 
      database: process.env.USER
    }
};