import Playlist from "../model/playlist.model.js";

export const createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const playlist = await Playlist.create({
            name,

        });
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();

        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSinglePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
