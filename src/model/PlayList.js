const mongoose = require('mongoose');
const database = require('../utils/db');

const playlistSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    musicList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    likes: Number,
});

const PlayList = mongoose.model('Playlist', playlistSchema);

module.exports = PlayList;
