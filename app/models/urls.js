'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URLref = new Schema({
    url_num: Number,
	original_url: String,
	short_url: String
});

module.exports = mongoose.model('URLref', URLref);