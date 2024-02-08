const express = require('express');
const router = express.Router();
const playlistController = require('../controller/PlayListController');

router.post('/create', playlistController.createPlaylist);
router.get('/', playlistController.getPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.put('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);

module.exports = router;
