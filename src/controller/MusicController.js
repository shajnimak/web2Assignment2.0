const Music = require('../model/Music');
const mongoose = require('mongoose');


class MusicController {
    async createMusic(req, res) {
        try {
            // Check if a file is uploaded
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
    
            // Extract title, author, and albumId from request body
            const { title, author, albumId } = req.body;
    
            // Create a new music document using Mongoose
            const music = await Music.create({
                title,
                author,
                albumId,
                filename: req.file.filename, // Filename stored in GridFS
            });
    
            // Respond with the created music object
            res.status(201).json(music);
        } catch (error) {
            console.error(error);
            // Handle any internal server errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

    async getFile(req, res) {
        const filename = req.params.filename; // Get the filename from the request parameters
    
        try {
            if (!mongoose.connection.db) {
                return res.status(500).json({ error: 'Database connection not established' });
            }
    
            const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'musicFiles'
            });
    
            const downloadStream = bucket.openDownloadStreamByName(filename);
            
            // Set response headers
            downloadStream.on('file', (fileInfo) => {
                res.set('Content-Type', fileInfo.contentType);
                res.set('Content-Disposition', 'attachment; filename="' + fileInfo.filename + '"');
            });
    
            // Pipe the download stream to the response
            downloadStream.pipe(res);
    
            // Handle stream errors
            downloadStream.on('error', function(error) {
                console.error(error);
                return res.status(500).json({ error: 'Error streaming file' });
            });
    
            // Optionally handle cleanup or other actions after streaming finishes
            downloadStream.on('finish', function() {
                // Optionally handle cleanup or other actions after streaming finishes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    

    async getMusicList(req, res) {
        try {
            const musicList = await Music.find();
            res.status(200).json(musicList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getMusicById(req, res) {
        try {
            const music = await Music.findById(req.params.id);
            if (!music) {
                return res.status(404).json({ error: 'Music not found' });
            }
            res.status(200).json(music);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateMusic(req, res) {
        try {
            const { title, author, albumId } = req.body;
            const updatedMusic = await Music.findByIdAndUpdate(
                req.params.id,
                { title, author, albumId },
                { new: true }
            );
            if (!updatedMusic) {
                return res.status(404).json({ error: 'Music not found' });
            }
            res.status(200).json(updatedMusic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteMusic(req, res) {
        try {
            const deletedMusic = await Music.findByIdAndDelete(req.params.id);
            if (!deletedMusic) {
                return res.status(404).json({ error: 'Music not found' });
            }
            res.status(200).json(deletedMusic);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new MusicController();
