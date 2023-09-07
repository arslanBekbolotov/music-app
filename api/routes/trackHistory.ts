import express from "express";
import { Error } from "mongoose";
import { TrackHistory } from "../models/TracksHistory";
import auth, { IRequestWithUser } from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, async (req, res, next) => {
  try {
    const { username } = (req as IRequestWithUser).user;

    const trackHistory = new TrackHistory({
      track: req.body.track,
      user: req.body.user,
    });

    await trackHistory.save();
    res.send({ trackHistory, username });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default trackHistoryRouter;
