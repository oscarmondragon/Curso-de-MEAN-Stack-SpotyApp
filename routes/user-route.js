'use strict';
var express = require('express');
var UserController = require('../controllers/user-controller');
var api = express.Router();
var md_auth= require('../middlewares/authentication');

api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
module.exports = api;
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);
module.exports = api;