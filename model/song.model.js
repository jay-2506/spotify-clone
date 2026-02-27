import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        audioUrl: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
        },
        playlist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    },
    { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
export default Song;