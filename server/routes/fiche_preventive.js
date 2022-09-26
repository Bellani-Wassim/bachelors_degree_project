const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.post('/', controllers.fiche_preventive.post);
route.get('/', controllers.fiche_preventive.get);
route.put('/delete', controllers.fiche_preventive.delete);
route.put('/update', controllers.fiche_preventive.update);

module.exports = route;