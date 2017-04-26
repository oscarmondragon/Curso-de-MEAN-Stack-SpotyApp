'use strict';
var express = require('express');
var UserController = require('../controllers/user-controller');
var api = express.Router();
api.get('/probando-controlador', UserController.pruebas);
module.exports = api;
api.post('/register', UserController.saveUser);
module.exports = api;