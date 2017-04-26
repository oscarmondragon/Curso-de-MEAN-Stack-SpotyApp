'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SongSchema = Schema ({
    number: String,
    name: String,
    duration: String,
    file; String,
    album: {tipe: Schema.ObjectId, ref:'Album'}
},
{
  collection : 'song'
});
module.exports = mongoose.model('Song',SongSchema);