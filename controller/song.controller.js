import Playlist from "../model/playlist.model.js";
import Song from "../model/song.model.js";



// ADD SONG
export const addSong = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to add a song",
            });
        }

        const { title, description, audioUrl, playlist } = req.body;

        if (!title || !audioUrl) {
            return res.status(400).json({
                message: "Title and audioUrl are required",
            });
        }

        const newSong = await Song.create({
            title,
            description,
            audioUrl,
            playlist,
        });

        return res.status(201).json({
            message: "Song added successfully",
            song: newSong,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message: "Song not added",
        });
    }
};

export const addThumbnail = async (req, res) => {
    try {
        if (req.user.role !== admin) {
            return res.status(400).json({ message: "You are not authorized to add thumbnail" })
        }

        await Song.findByIdAndUpdate(req.params.id, {

        }, { new: true })
        return res.json({ message: "Thumbnail added successfully" })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Thumbnail not added" })
    }
}

// all albums  
export const getAllAlbums = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        return res.json(playlists);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Albums not found" })
    }
}

// all songs
export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        return res.json(songs);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Songs not found" })
    }
}
// all songs by album
export const getSongsByPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        const songs = await Song.find({ playlist: req.params.id });
        return res.json({ playlist, songs });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Album not found" })
    }
}

// delete songs
export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        await song.deleteOne();
        return res.json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Song not deleted" });
    }
}






// get song by id

export const getSongById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find playlist and populate only matching song
        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({ message: "song not found" });
        }


        res.status(200).json({
            song
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
