const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.post('/', controllers.fiche_curative.post);
route.get('/', controllers.fiche_curative.get);
route.put('/delete', controllers.fiche_curative.delete);
route.put('/update', controllers.fiche_curative.update);

module.exports = route;