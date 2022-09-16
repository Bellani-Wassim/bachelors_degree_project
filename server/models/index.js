const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const databaseConfig = require('../config/database/config');

const sequelize = new Sequelize(databaseConfig[process.env.NODE_ENV]);

const db = {};

fs
  .readdirSync(__dirname)
  .filter((fileName) => fileName !== 'index.js')
  .forEach((fileName) => {
    const model = require(path.join(__dirname, fileName))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object
  .keys(db)
  .forEach((modelName) => db[modelName].associate && db[modelName].associate(db));

sequelize.seed = require('../config/database/seeds')(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
