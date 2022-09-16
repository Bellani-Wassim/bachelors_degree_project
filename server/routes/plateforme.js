const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.plateforme.get);
route.post('/', controllers.plateforme.post);
route.post('/delete', controllers.plateforme.delete);
route.post('/update', controllers.plateforme.put);

module.exports = route;
