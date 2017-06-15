'use strict';
var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist-model');
var Album = require('../models/album-model');
var Song = require('../models/song-model');

function getArtist(req,res){
    res.status(200).send({message: 'Metodo getArtist del controlador artist'});
}

module.exports = {
    getArtist
}
