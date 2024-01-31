import express from 'express';
import {Track} from '../models/Track';
import {Error} from 'mongoose';
import {Album} from '../models/Album';
import {upload} from '../multer';
import auth, {IRequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import config from '../config';
import fs from 'fs';
import {cloudinaryFileUploadMethod} from "../controller/uploader";

const tracksRouter = express.Router();
tracksRouter.post('/', auth, upload.fields([{ name: 'mp3File', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res, next) => {
  const user = (req as IRequestWithUser).user;

  const trackData = {
    name: req.body.name,
    user: user._id,
    number: req.body.number,
    album: req.body.album,
    duration: req.body.duration,
    youtubeLink: req.body.youtubeLink,
  };

  try {
    // Проверка, что req.files существует и содержит mp3File и image
    if (req.files && 'mp3File' in req.files && 'image' in req.files) {
      // Загрузка mp3 файла на Cloudinary
      const mp3file = await cloudinaryFileUploadMethod(req.files['mp3File'][0].path);

      // Загрузка изображения на Cloudinary
      const image = await cloudinaryFileUploadMethod(req.files['image'][0].path);

      // Создание объекта Track с учетом URL файлов на Cloudinary
      const track = new Track({
        ...trackData,
        mp3File: mp3file,
        image: image,
      });

      // Сохранение трека в базе данных
      await track.save();

      return res.send(track);
    } else {
      // Если mp3File или image отсутствуют, вернуть ошибку
      return res.status(400).send({ message: 'mp3File and image are required.' });
    }
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

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
