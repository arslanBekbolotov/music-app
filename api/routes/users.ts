import express from 'express';
import {Error} from 'mongoose';
import {User} from '../models/User';
import config from '../config';
import {OAuth2Client} from 'google-auth-library';
import {cloudinaryFileUploadMethod} from "../controller/uploader";
import crypto from 'crypto';
import {upload} from '../multer';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    const avatar = await cloudinaryFileUploadMethod(req.file?.path || "")
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar,
    });

    user.generateToken();

    await user.save();
    return res.send({user, message: 'Success'});
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
      return res.status(400).send({error: 'Wrong password or username!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Wrong password or username!'});
    }

    user.generateToken();
    await user.save();

    res.send({
      message: 'Username and password correct!',
      user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: 'Google login error!'});
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];

    if (!email) {
      return res.status(400).send({error: 'Not enough user data to continue'});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();

    await user.save();

    return res.send({message: 'Login with Google successful!', user});
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'Success'};
    if (!token) {
      return res.status(204).send(success);
    }
    const user = await User.findOne({token});

    if (!user) return res.status(204).send(success);

    user.generateToken();
    await user.save();

    return res.status(204).send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
