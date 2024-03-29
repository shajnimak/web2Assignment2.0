const mongoose = require('mongoose');
const database = require('../utils/db');

const Schema = mongoose.Schema;

const musicSchema = new Schema({
    title: String,
    author: String,
    albumId: { type: Schema.Types.ObjectId, ref: 'Album' },
    filename: String, // Name of the file in GridFS
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
