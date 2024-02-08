const express = require('express');
const router = express.Router();
const albumController = require('../controller/AlbumController');

router.post('/create', albumController.createAlbum);
router.get('/', albumController.getAlbums);
router.get('/:id', albumController.getAlbumById);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
