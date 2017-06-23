'use strict';
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist-model');
var Album = require('../models/album-model');
var Song = require('../models/song-model');

function getAlbum(req, res) {
    res.status(200).send({
        message: "Todo bien"
    });
}
module.exports = {
    getAlbum
};