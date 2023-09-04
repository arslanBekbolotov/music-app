import express from "express";
import { Track } from "../models/Track";
import { Album } from "../models/Album";

const tracksRouter = express.Router();

interface ITracks {
  _id: string;
  name: string;
  album: string;
  duration?: string;
}

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
  const { album, artist } = req.query;

  try {
    if (album) {
      const tracks = await Track.findOne({ album }).populate("album");
      return res.send(tracks);
    }

    if (artist) {
      const albums = await Album.find({ artist });
      let tracks: ITracks[] = [];

      const tracksList: ITracks[][] = await Promise.all(
        albums.map(async (album) => await Track.find({ album })),
      );

      for (let i = 0; i <= tracksList.length - 1; i++) {
        tracks = [...tracks, ...tracksList[i]];
      }

      return res.send(tracks);
    }

    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default tracksRouter;
