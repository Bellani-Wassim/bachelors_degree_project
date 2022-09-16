module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: 'database_test.sqlite',
    logging: false,
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
