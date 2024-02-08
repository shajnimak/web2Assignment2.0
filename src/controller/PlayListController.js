const Playlist = require('../model/PlayList');

class PlaylistController {
    async createPlaylist(req, res) {
        try {
            const { owner, musicList, likes } = req.body;
            const playlist = await Playlist.create({ owner, musicList, likes });
            res.status(201).json(playlist);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getPlaylists(req, res) {
        try {
            const playlists = await Playlist.find();
            res.status(200).json(playlists);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getPlaylistById(req, res) {
        try {
            const playlist = await Playlist.findById(req.params.id);
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist not found' });
            }
            res.status(200).json(playlist);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updatePlaylist(req, res) {
        try {
            const { owner, musicList, likes } = req.body;
            const updatedPlaylist = await Playlist.findByIdAndUpdate(
                req.params.id,
                { owner, musicList, likes },
                { new: true }
            );
            if (!updatedPlaylist) {
                return res.status(404).json({ error: 'Playlist not found' });
            }
            res.status(200).json(updatedPlaylist);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deletePlaylist(req, res) {
        try {
            const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
            if (!deletedPlaylist) {
                return res.status(404).json({ error: 'Playlist not found' });
            }
            res.status(200).json(deletedPlaylist);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new PlaylistController();
