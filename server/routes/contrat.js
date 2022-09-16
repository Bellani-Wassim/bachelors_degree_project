const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.contrat.get);
route.post('/', controllers.contrat.post);

module.exports = route;
