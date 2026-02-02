import express from 'express';
import {Track} from '../models/Track';
import mongoose from 'mongoose';
import {Album} from '../models/Album';
import {upload} from '../multer';
import auth, {IRequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import config from '../config';
import fs from 'fs';
import {cloudinaryFileUploadMethod} from "../controller/uploader";

const tracksRouter = express.Router();

tracksRouter.post(
  '/',
  auth,
  upload.fields([
    { name: 'mp3File', maxCount: 1 },
    { name: 'MP3file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const user = (req as IRequestWithUser).user;

      // 1. Явно приводим тип файлов
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

      // 2. Извлекаем пути к файлам безопасно через опциональную цепочку
      // Проверяем оба варианта написания для MP3
      const mp3FileObject = files?.['mp3File']?.[0] || files?.['MP3file']?.[0];
      const imageFileObject = files?.['image']?.[0];

      // 3. Валидация: если чего-то не хватает, сразу выходим
      if (!mp3FileObject || !imageFileObject) {
        return res.status(400).send({ message: 'Both mp3File and image are required.' });
      }

      // 4. Загружаем в Cloudinary
      const [mp3Url, imageUrl] = await Promise.all([
        cloudinaryFileUploadMethod(mp3FileObject.path),
        cloudinaryFileUploadMethod(imageFileObject.path)
      ]);

      const trackData = {
        name: req.body.name,
        user: user._id,
        number: req.body.number,
        album: req.body.album,
        duration: req.body.duration,
        youtubeLink: req.body.youtubeLink,
        mp3File: mp3Url,
        image: imageUrl,
      };

      const track = new Track(trackData);
      await track.save();

      return res.send(track);

    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  }
);

tracksRouter.get('/', async (req, res) => {
  const {album, artist} = req.query;

  try {
    if (album) {
      const tracks = await Track.find({album}).sort({number: 1});
      const albumData = await Album.findOne({_id: album}).populate('artist');

      return res.send({tracks: [...tracks], album: albumData});
    }

    if (artist) {
      const albums = await Album.find({artist});
      const tracks = await Track.find({album: {$in: albums}}).sort({
        number: 1,
      });

      return res.send(tracks);
    }

    const tracks = await Track.find().sort({number: 1});
    return res.send(tracks);
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('', 'admin'), async (req, res) => {
  const {id} = req.params;

  try {
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).send('Not Found!');
    }

    await Track.findByIdAndUpdate(id, {isPublished: !track.isPublished});

    return res.send({message: 'success'});
  } catch (e) {
    res.status(500).send('error');
  }
});

tracksRouter.delete('/:id', auth, permit('track', 'admin'), async (req, res) => {
  const {id} = req.params;

  try {
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).send({message: 'Not Found!'});
    }

    await Track.findByIdAndRemove(id);

    if (track.image) {
      const filePath = config.publicPath + '/' + track.image;
      fs.unlinkSync(filePath);
    }

    if (track.mp3File) {
      const filePath = config.publicPath + '/' + track.mp3File;
      fs.unlinkSync(filePath);
    }

    res.send('Deleted');
  } catch (e) {
    res.status(500).send('error');
  }
});

export default tracksRouter;
