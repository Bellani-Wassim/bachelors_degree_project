const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.get('/', controllers.employes.get);
route.put('/approve', controllers.employes.approve);
route.put('/delete', controllers.employes.delete);
route.put('/employeStatus', controllers.employes.employeStatus);

module.exports = route;
