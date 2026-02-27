import express from "express";
import {
    addSong,
    getAllSongs,
    deleteSong,
    getSongById,
} from "../controller/song.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/add", authMiddleware, addSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById)
router.delete("/:id", authMiddleware, deleteSong);


export default router;