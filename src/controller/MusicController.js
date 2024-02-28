const Music = require('../model/Music');

class MusicController {
    async createMusic(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const { title, author, albumId } = req.body;
            // Create a reference to the uploaded file in your music document
            const music = await Music.create({
                title,
                author,
                albumId,
                filename: req.file.filename, // Filename stored in GridFS
                fileId: req.file.id // Optional: Store the file ID if needed
            });
            res.status(201).json(music);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getFile(req, res) {
        const filename = req.params.filename;
        if (!mongoose.connection.db) {
            return res.status(500).json({ error: 'Database connection not established' });
        }
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'musicFiles'
        });
    
        bucket.find({ filename: filename }).toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({ error: 'File not found' });
            }
            res.set('Content-Type', files[0].contentType);
            const downloadStream = bucket.openDownloadStreamByName(filename);
            downloadStream.pipe(res);
        });
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
