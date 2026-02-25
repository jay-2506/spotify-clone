import express from "express";
import {
    createPlaylist,
    getAllPlaylists,
    getSinglePlaylist,
    addSongToPlaylist,
    deletePlaylist
} from "../controller/playlist.controller.js";

const router = express.Router();

router.post("/create", createPlaylist);
router.get("/", getAllPlaylists);
router.get("/:id/:songId", getSinglePlaylist);
router.post("/:playlistId/add-song/:songId", addSongToPlaylist);
router.delete("/:id", deletePlaylist);

export default router;
