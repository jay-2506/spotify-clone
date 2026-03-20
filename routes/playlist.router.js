import express from "express";
import {
    createPlaylist,
    getAllPlaylists,
    getSinglePlaylist,
    addSongToPlaylist,
    deletePlaylist,
    getPlaylistSongs,

} from "../controller/playlist.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPlaylist);
router.get("/", authMiddleware, getAllPlaylists);
router.get("/:id", getSinglePlaylist);
router.get("/:id/songs", getPlaylistSongs);

router.post("/:playlistId/add-song/:songId", addSongToPlaylist);
router.delete("/:id", deletePlaylist);

export default router;
