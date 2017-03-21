module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.USER
    }
  }
}
