import Playlist from "../model/playlist.model.js";
import Song from "../model/song.model.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const playlist = await Playlist.create({
      name,
      description,
      userid: req.user.id,
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userid: req.user.id }).populate(
      "tracks",
    );

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
      playlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete playlist
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

// playlist to open songs

export const getPlaylistSongs = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("tracks");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist.tracks);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: "Playlist song not found" });
  }
};

// get single song
// export const getPlaylistSingleSong = async (req, res) => {
//     try {
//         const playlist = await Playlist.findById(req.params.id).populate("songs");
//         if (!playlist) {
//             return res.status(404).json({ message: "Songs not found" })
//         }
//         res.status(200).json(playlist.Song)
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json({ message: "Playlist song not found " })

//     }
// }

export const getSingleSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.params;

    // Find playlist and populate only matching song
    const playlist = await Playlist.findById(songId).populate("tracks");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({
      playlist: playlist.title,
      song: playlist.tracks[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
//
