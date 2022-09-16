const express = require('express');
const controllers = require('../controllers');

const route = express.Router();

route.put('/updateName', controllers.updateEmploye.updateName);
route.put('/updateSurname', controllers.updateEmploye.updateSurname);
route.put('/updateEmail', controllers.updateEmploye.updateEmail);
route.put('/updatePassword', controllers.updateEmploye.updatePassword);

module.exports = route;
