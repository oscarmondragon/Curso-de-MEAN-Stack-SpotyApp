'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user_routes = require('./routes/user-route');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/api',user_routes);
//configurar cabeceras http
//rutas base

module.exports = app;