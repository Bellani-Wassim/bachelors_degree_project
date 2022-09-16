const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.technicien.get);
route.post('/', controllers.technicien.post);
route.post('/delete', controllers.technicien.delete);
route.post('/update', controllers.technicien.put);

module.exports = route;
