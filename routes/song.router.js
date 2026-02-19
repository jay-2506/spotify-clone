import express from "express";
import { createAlbum, addSong, addThumbnail, getAllAlbums, getAllSongs, getSongsByAlbum } from "../controller/song.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();
router.post("/album", authMiddleware, createAlbum)
router.post("/song", authMiddleware, addSong)
router.post("/thumbnail", authMiddleware, addThumbnail)
router.get("/albums", getAllAlbums)
router.get("/songs", getAllSongs)
router.get("/songs/:id", getSongsByAlbum)

export default router;