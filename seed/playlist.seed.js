import mongoose from "mongoose";
import dotenv from "dotenv";
import Playlist from "../models/playlist.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const playlists = [
    {
        name: "Chill Vibes",
        description: "Relaxing songs",
        coverImage: "chill.jpg",
        tracks: [
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                album: "After Hours",
                duration: 200000,
                audioUrl: "/songs/blinding_lights.mp3",
                coverImage: "after_hours.jpg"
            }
        ]
    },
    {
        name: "Workout Energy",
        description: "Gym songs",
        coverImage: "workout.jpg",
        tracks: [
            {
                title: "Stronger",
                artist: "Kanye West",
                album: "Graduation",
                duration: 311000,
                audioUrl: "/songs/stronger.mp3",
                coverImage: "graduation.jpg"
            }
        ]
    }
];

await Playlist.insertMany(playlists);

console.log("Playlists Inserted");
process.exit();
