import express from "express";
import { imagesUpload } from "../multer";
import { Album } from "../models/Album";
import { Error } from "mongoose";
import { Track } from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import config from "../config";
import * as fs from "fs";

const albumsRouter = express.Router();

albumsRouter.post(
  "/",
  auth,
  permit("admin"),
  imagesUpload.single("image"),
  async (req, res, next) => {
    const albumData = {
      name: req.body.name,
      album: req.body.album,
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
  },
);

albumsRouter.get("/", async (req, res) => {
  const { album } = req.query;

  try {
    if (album) {
      const albums = await Album.find({ album })
        .populate("album")
        .sort({ release: -1 });
      const result = await Promise.all(
        albums.map(async (item) => {
          const count = await Track.find({ album: item._id }).count();
          return {
            ...item.toObject(),
            count,
          };
        }),
      );

      return res.send({ albums: result, album: albums[0].artist });
    }

    const albums = await Album.find().sort({ release: -1 });

    return res.send(albums);
  } catch {
    return res.status(500);
  }
});

albumsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const albums = await Album.findOne({ _id: id }).populate("album");
    return res.send(albums);
  } catch {
    return res.status(500);
  }
});

albumsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const album = await Album.findById(id);

      if (!album) {
        return res.status(404).send("Not Found!");
      }

      await Album.findByIdAndUpdate(id, { isPublished: !album.isPublished });

      return res.send({ message: "success" });
    } catch (e) {
      res.status(500).send("error");
    }
  },
);

albumsRouter.delete("/:id", auth, permit("admin"), async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send("Not Found!");
    }

    await Album.findByIdAndRemove(id);

    if (album.image) {
      const filePath = config.publicPath + "/" + album.image;
      fs.unlinkSync(filePath);
    }

    return res.send("Deleted");
  } catch (e) {
    res.status(500).send("error");
  }
});

export default albumsRouter;
