const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.ticket.get);
route.post('/', controllers.ticket.post);

module.exports = route;
