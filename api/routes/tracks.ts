import express from "express";
import { Track } from "../models/Track";
import { Error } from "mongoose";
import { Album } from "../models/Album";
import { mp3FileUpload } from "../multer";

const tracksRouter = express.Router();

tracksRouter.post(
  "/",
  mp3FileUpload.single("mp3File"),
  async (req, res, next) => {
    const trackData = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      mp3File: req.file ? req.file.filename : null,
    };

    const track = new Track(trackData);

    try {
      await track.save();
      return res.send(track);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  },
);

tracksRouter.get("/", async (req, res) => {
  const { album, artist } = req.query;

  try {
    if (album) {
      const tracks = await Track.find({ album }).sort({ number: 1 });
      const albumData = await Album.findOne({ _id: album }).populate("artist");

      return res.send({ tracks: [...tracks], album: albumData });
    }

    if (artist) {
      const albums = await Album.find({ artist });
      const tracks = await Track.find({ album: { $in: albums } }).sort({
        number: 1,
      });

      return res.send(tracks);
    }

    const tracks = await Track.find().sort({ number: 1 });
    return res.send(tracks);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default tracksRouter;
