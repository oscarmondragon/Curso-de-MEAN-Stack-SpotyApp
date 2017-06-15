'use strict';
 var express = require('express');
 var ArtistController = require('../controllers/artist-controller');
 var api = express.Router();
 var md_auth = require('../middlewares/authentication');

 api.get('/artist',md_auth.ensureAuth, ArtistController.getArtist);
module.exports = api;