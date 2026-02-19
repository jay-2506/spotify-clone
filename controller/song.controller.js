import Album from "../model/album.model.js";
import cloudinary from "cloudinary";
import getDataurl from "../utils/url.generator.js";

export const createAlbum = async (req, res) => {
    try {


        if (req.user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to create an album" });
        }
        const { title, description } = req.body;




        await Album.create({
            title,
            description,

        })
        return res.json({ message: "Album created successfully" })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "Album not created" })


    }
}

// add song 
export const addSong = async (req, res) => {
    try {
        if (req.user.role !== admin) {
            return res.status(400).json({ message: "You are not authorized to add thumbnail" })
        }

        await Song.create({
            title,
            description,



        });



        return res.json({ message: "song added successfully" })
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "song not added" })

    }
}
// Thambnail
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
        const albums = await Album.find();
        return res.json(albums);
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
export const getSongsByAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        const songs = await Song.find({ albums: req.params.id });
        return res.json({ album, songs });
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