// import mongoose from "mongoose";

// export const trackSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     artist: {
//         type: String,
//         required: true
//     },
//     album: {
//         type: String
//     },
//     duration: {
//         type: Number,
//         required: true
//     },
//     audioUrl: {
//         type: String
//     },
//     coverImage: {
//         type: String
//     }
// });

// const playlistSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     coverImage: {
//         type: String
//     },
//     tracks: [trackSchema]

// },
//     {
//         timestamps: true

//     });

// export default mongoose.model("Playlist", playlistSchema);
// // export default mongoose.model("Track", trackSchema)


import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song"
        }
    ]
}, { timestamps: true });

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;