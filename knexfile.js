module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { 
      user: process.env.USER, 
      database: process.env.USER
    }
};