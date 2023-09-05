import express from "express";
import { Track } from "../models/Track";
import { Album } from "../models/Album";
import { ITrackMutation } from "../types";
import {Error} from "mongoose";

const tracksRouter = express.Router();

tracksRouter.post("/", async (req, res,next) => {
  const trackData = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
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
      let tracks: ITrackMutation[] = [];

      const tracksList: ITrackMutation[][] = await Promise.all(
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
