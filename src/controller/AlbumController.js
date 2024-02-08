const Album = require('../model/Album');

class AlbumController {
    async createAlbum(req, res) {
        try {
            const { title, year, author } = req.body;
            const album = await Album.create({ title, year, author });
            res.status(201).json(album);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAlbums(req, res) {
        try {
            const albums = await Album.find();
            res.status(200).json(albums);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAlbumById(req, res) {
        try {
            const album = await Album.findById(req.params.id);
            if (!album) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(album);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateAlbum(req, res) {
        try {
            const { title, year, author } = req.body;
            const updatedAlbum = await Album.findByIdAndUpdate(
                req.params.id,
                { title, year, author },
                { new: true }
            );
            if (!updatedAlbum) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(updatedAlbum);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteAlbum(req, res) {
        try {
            const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
            if (!deletedAlbum) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(deletedAlbum);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new AlbumController();
