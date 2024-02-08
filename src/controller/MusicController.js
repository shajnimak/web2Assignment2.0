const Music = require('../model/Music');

class MusicController {
    async createMusic(req, res) {
        try {
            const { title, author, albumId } = req.body;
            const musicFile = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };

            const music = await Music.create({ title, author, musicFile, albumId });
            res.status(201).json(music);
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
