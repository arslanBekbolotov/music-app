import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from './auth';
import { Album } from '../models/Album';
import { Track } from '../models/Track';
import { Artist } from '../models/Artist';

const permit = (subjectName?: string, ...roles: string[]) => {
  return async (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithUser;
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    if (subjectName === 'album') {
      const album = await Album.findById(id);
      if (album && album.user.toString() === req.user._id.toString()) {
        return next();
      }
    }

    if (subjectName === 'track') {
      const track = await Track.findById(id);
      if (track && track.user.toString() === req.user._id.toString()) {
        return next();
      }
    }

    if (subjectName === 'artist') {
      const artist = await Artist.findById(id);
      if (artist && artist.user.toString() === req.user._id.toString()) {
        return next();
      }
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Unauthorized' });
    }

    next();
  };
};

export default permit;
