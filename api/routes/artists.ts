import express from "express";
import { imagesUpload } from "../multer";
import { Artist } from "../models/Artist";
import { Error } from "mongoose";
import auth, { IRequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import { Album } from "../models/Album";
import { Track } from "../models/Track";
import config from "../config";
import fs from "fs";

const artistsRouter = express.Router();

artistsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    const user = (req as IRequestWithUser).user;

    const artistData = {
      name: req.body.name,
      user: user._id,
      info: req.body.info,
      image: req.file && req.file.filename,
    };

    const artist = new Artist(artistData);

    try {
      await artist.save();
      return res.send(artist);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }

      next(error);
    }
  },
);

artistsRouter.get("/", async (req, res) => {
  try {
    const artist = await Artist.find();
    return res.send(artist);
  } catch (e) {
    return res.sendStatus(500);
  }
});

artistsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("", "admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const artist = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send("Not Found!");
      }

      await Artist.findByIdAndUpdate(id, { isPublished: !artist.isPublished });

      return res.send({ message: "success" });
    } catch (e) {
      res.status(500).send("error");
    }
  },
);

artistsRouter.delete(
  "/:id",
  auth,
  permit("artist", "admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const artist = await Artist.findById(id);
      if (!artist) {
        return res.status(404).send({ message: "Not Found!" });
      }

      const albums = await Album.find({ artist: { $in: artist._id } });

      for (const album of albums) {
        await Track.deleteMany({ album: { $in: album._id } });
      }

      await Album.deleteMany({ artist: { $in: artist._id } });
      await Artist.findByIdAndRemove(id);

      if (artist.image) {
        const filePath = config.publicPath + "/" + artist.image;
        fs.unlinkSync(filePath);
      }

      res.send("Deleted");
    } catch (e) {
      res.status(500).send("error");
    }
  },
);

export default artistsRouter;
