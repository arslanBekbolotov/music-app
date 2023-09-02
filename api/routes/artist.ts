import express from "express";
import { imagesUpload } from "../multer";
import { Artist } from "../models/Artist";

const artistsRouter = express.Router();

artistsRouter.post(
  "/",
  imagesUpload.single("image"),
  async (req, res, next) => {
    const artistData = {
      name: req.body.name,
      info: req.body.info,
      image: req.file ? req.file.filename : null,
    };

    const artist = new Artist(artistData);

    try {
      await artist.save();
      return res.send(artist);
    } catch (e) {
      return res.status(400).send(e);
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

export default artistsRouter;
