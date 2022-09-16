const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

require('dotenv').config();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const routes = require('./routes');

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// error handler middlewares
const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);

const { sequelize } = require('./models');

app.startDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync({ force: true });
    await sequelize.seed();
  }

  if (process.env.NODE_ENV === 'development') {
    const dbConfig = require('./config/database/config');
    const dbExist = fs.existsSync(path.join(__dirname, '..', dbConfig.development.storage));
    await sequelize.sync({ force: false });

    if (!dbExist) await sequelize.seed();
  }

  if (process.env.NODE_ENV === 'production') await sequelize.sync({ force: false });

  await sequelize.authenticate();
};

module.exports = app;
