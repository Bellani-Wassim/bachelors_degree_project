const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.post('/', controllers.fiche_preventive.post);
route.get('/', controllers.fiche_preventive.get);

module.exports = route;