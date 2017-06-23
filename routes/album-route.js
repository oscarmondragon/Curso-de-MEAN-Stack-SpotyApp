'use strict';
 var express = require('express');
 var AlbumController = require('../controllers/album-controller');
 var api = express.Router();
 var md_auth = require('../middlewares/authentication');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albums'})
 api.get('/album/',md_auth.ensureAuth, AlbumController.getAlbum);


module.exports = api;