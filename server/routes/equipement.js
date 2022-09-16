const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.equipement.get);
route.post('/', controllers.equipement.post);
route.post('/delete', controllers.equipement.delete);
route.post('/update', controllers.equipement.put);

module.exports = route;
