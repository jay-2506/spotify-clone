// import Playlist from "../model/playlist.model.js";
// import { trackSchema } from "../model/playlist.model.js";


// // create playlist
// export const createPlaylist = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const playlist = await Playlist.create({
//             name,

//         });
//         await playlist.save();
//         res.status(201).json(playlist);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// // get all playlists
// export const getAllPlaylists = async (req, res) => {
//     try {
//         const playlists = await Playlist.find();

//         res.status(200).json(playlists);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // get single playlist
// export const getSinglePlaylist = async (req, res) => {
//     try {
//         const playlist = await Playlist.findById(req.params.id);

//         if (!playlist) {
//             return res.status(404).json({ message: "Playlist not found" });
//         }

//         res.status(200).json(playlist);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // get tracks by playlist
// export const getTracksByPlaylist = async (req, res) => {
//     try {
//         const track = await trackSchema.findById(req.params.id);



//         if (!track) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Track not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             count: playlist.tracks.length,
//             tracks: playlist.tracks
//         });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };



import Playlist from "../model/playlist.model.js";
import Song from "../model/song.model.js";

export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;

        const playlist = await Playlist.create({
            name,
            description
        });

        res.status(201).json(playlist);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find().populate("tracks");

        res.status(200).json(playlists);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSinglePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate("tracks");

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json(playlist);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const playlist = await Playlist.findById(playlistId);
        const song = await Song.findById(songId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        playlist.tracks.push(songId);
        await playlist.save();

        res.status(200).json({
            message: "Song added successfully",
            playlist
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        res.status(200).json({ message: "Playlist deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



