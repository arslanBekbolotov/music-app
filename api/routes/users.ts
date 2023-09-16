import express from "express";
import { Error } from "mongoose";
import { User } from "../models/User";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user)

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

export default usersRouter;
