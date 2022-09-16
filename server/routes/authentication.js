const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.post('/login', controllers.login.login);
route.post('/register', controllers.register.register);

module.exports = route;
