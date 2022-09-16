const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.fournisseur.get);
route.post('/', controllers.fournisseur.post);
route.post('/delete', controllers.fournisseur.delete);
route.post('/update', controllers.fournisseur.put);

module.exports = route;
