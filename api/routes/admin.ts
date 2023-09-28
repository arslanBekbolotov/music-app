import express from "express";
import { Track } from "../models/Track";
import { Artist } from "../models/Artist";
import { Album } from "../models/Album";

const adminRouter = express.Router();

adminRouter.get("/", async (req, res) => {
  try {
    const unpublishedTracks = await Track.find({ isPublished: false });
    const unpublishedAlbums = await Album.find({ isPublished: false });
    const unpublishedArtists = await Artist.find({ isPublished: false });

    res.send({
      albums: unpublishedAlbums,
      artists: unpublishedArtists,
      tracks: unpublishedTracks,
    });
  } catch {
    return res.status(500);
  }
});

export default adminRouter;
