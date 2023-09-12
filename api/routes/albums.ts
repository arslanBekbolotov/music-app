import express from "express";
import { imagesUpload } from "../multer";
import { Album } from "../models/Album";
import { Error } from "mongoose";
import {IAlbumMutation} from "../types";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  const albumData = {
    name: req.body.name,
    artist: req.body.artist,
    release: req.body.release,
    image: req.file ? req.file.filename : null,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

albumsRouter.get("/", async (req, res) => {
  const { artist } = req.query;

  try {
    if (artist) {
      const albums = await Album.find({ artist });

      return res.send(albums);
    }

    const albums:IAlbumMutation[] = await Album.find();

    return res.send(albums);
  } catch (e) {
    return res.status(500).send(e);
  }
});

albumsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const albums = await Album.findOne({ _id: id }).populate("artist");
    return res.send(albums);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default albumsRouter;
