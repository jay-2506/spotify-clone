import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    audioUrl: {
        type: String
    },
    coverImage: {
        type: String
    }
});

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    coverImage: {
        type: String
    },
    tracks: [trackSchema]

},
    {
        timestamps: true

    });

export default mongoose.model("Playlist", playlistSchema);
