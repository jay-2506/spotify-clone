import mongoose from "mongoose";
import dotenv from "dotenv";
import Song from "./model/song.model.js";
import Playlist from "./model/playlist.model.js";

dotenv.config();

const run = async () => {
    try {
        console.log("Connecting to:", process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        const songCount = await Song.countDocuments();
        const playlistCount = await Playlist.countDocuments();
        console.log(`Songs counts: ${songCount}`);
        console.log(`Playlists counts: ${playlistCount}`);

        if (songCount > 0) {
            const songs = await Song.find().limit(2);
            console.log("Sample Songs:", JSON.stringify(songs, null, 2));
        }

        if (playlistCount > 0) {
            const playlists = await Playlist.find().limit(2);
            console.log("Sample Playlists:", JSON.stringify(playlists, null, 2));
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
};

run();
