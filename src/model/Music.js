const mongoose = require('mongoose');
const database = require('../utils/db');

const musicSchema = new mongoose.Schema({
    title: String,
    author: String,
    musicFile: {
        data: Buffer,
        contentType: String,
    },
    albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
