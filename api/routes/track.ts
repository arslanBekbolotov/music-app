import express from "express";
import { Track } from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.post("/", async (req, res) => {
  const trackData = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    return res.status(400).send(e);
  }
});

tracksRouter.get("/", async (req, res) => {
  const { album } = req.query;

  try {
    if (album) {
      const tracks = await Track.findOne({ album }).populate("album");
      return res.send(tracks);
    }

    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default tracksRouter;
