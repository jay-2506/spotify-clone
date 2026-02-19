import express from "express";
import * as ctrl from "../controller/playlist.controller.js";

const router = express.Router();
router.post("/create", ctrl.createPlaylist)
// Get all playlists
router.get("/", ctrl.getAllPlaylists);

// Get single playlist
router.get("/:id", ctrl.getSinglePlaylist);



export default router;
