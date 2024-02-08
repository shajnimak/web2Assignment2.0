const mongoose = require('mongoose');
const database = require('../utils/db');

const albumSchema = new mongoose.Schema({
    title: String,
    year: Number,
    author: String,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
