const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.contrat.get);
route.post('/', controllers.contrat.post);
route.put('/delete', controllers.contrat.delete);
route.put('/update', controllers.contrat.put);

module.exports = route;
