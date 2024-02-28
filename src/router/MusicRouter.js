const express = require('express');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const router = express.Router();
const musicController = require('../controller/MusicController');
const mongoose = require('mongoose');
require('dotenv').config();

// Ensure your MongoDB connection is available
const mongoURI = process.env.MONGO_URI;

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve) => {
      const filename = `${Date.now()}--${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'musicFiles' // Use the same bucket name for all files
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

router.post('/create', upload.single('musicFile'), musicController.createMusic);
router.get('/', musicController.getMusicList);
router.get('/:id', musicController.getMusicById);
router.get('/file/:filename', musicController.getFile);
router.put('/:id', musicController.updateMusic);
router.delete('/:id', musicController.deleteMusic);

module.exports = router;
