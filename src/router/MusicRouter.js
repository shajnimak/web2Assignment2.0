const express = require('express');
const router = express.Router();
const multer = require('multer');
const musicController = require('../controller/MusicController');

const upload = multer();

router.post('/create', upload.single('musicFile'), musicController.createMusic);
router.get('/', musicController.getMusicList);
router.get('/:id', musicController.getMusicById);
router.put('/:id', musicController.updateMusic);
router.delete('/:id', musicController.deleteMusic);

module.exports = router;
