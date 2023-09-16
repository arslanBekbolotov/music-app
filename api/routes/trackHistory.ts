import express from "express";
import { Error } from "mongoose";
import { TrackHistory } from "../models/TracksHistory";
import auth, { IRequestWithUser } from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    const trackHistory = new TrackHistory({
      track: req.body.track,
      user: user._id,
    });

    await trackHistory.save();
    return res.send({ trackHistory, username: user.username });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

trackHistoryRouter.get("/", auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    if (user) {
      const trackHistories = await TrackHistory.find({ user })
        .populate({
          path: "track",
          select: "name",
          populate: {
            path: "album",
            select: "name",
            populate: {
              path: "artist",
              model: "Artist",
              select: "name",
            },
          },
        })
        .sort({ date: -1 });
      return res.send(trackHistories);
    }
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;
