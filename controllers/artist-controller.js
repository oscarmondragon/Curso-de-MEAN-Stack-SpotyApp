'use strict';
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist-model');
var Album = require('../models/album-model');
var Song = require('../models/song-model');

function getArtist(req, res) {
    var artistId = req.params.id;
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion.'
            });
        } else {
            if (!artist) {
                res.status(404).send({
                    message: 'El artista no existe'
                });
            } else {
                res.status(200).send({
                    artist
                });
            }
        }
    });
}

function saveArtist(req, res) {
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el artista'
            });
        } else {
            if (!artistStored) {
                res.status(404).send({
                    message: 'El artista no ha sido guardado'
                });
            } else {
                res.status(200).send({
                    artist: artistStored
                });
            }
        }
    });
}

function getArtists(req, res) {
    var page = req.params.page || 1;
    var itemPerPage = 3;
    Artist.find().sort('name').paginate(page, itemPerPage, function(err, artists, total) {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion.'
            });
        } else {
            if (!artists) {
                res.status(4040).send({
                    message: 'No hay artistas'
                });
            } else {
                return res.status(200).send({
                    pages: total,
                    artists: artists
                });
            }
        }
    });
}
module.exports = {
    getArtist,
    saveArtist,
    getArtists
}