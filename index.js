import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import songRouter from "./routes/song.router.js";
import playlistRouter from "./routes/playlist.router.js";
import connectDB from "./config/db.js";
import cloudinary from "cloudinary";
import cors from "cors";

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "https://f-spotify-clone.vercel.app/",
    credentials: true,
  }),
);
app.use(express.static("public"));
app.use(express.json());
const port = process.env.PORT;
app.use("/api", userRouter);
app.use("/api/song", songRouter);
app.use("/api/playlist", playlistRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
