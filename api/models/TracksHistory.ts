import mongoose, { Schema, Types } from "mongoose";
import { Track } from "./Track";
import { ITracksHistory } from "../types";
import { User } from "./User";

const TrackHistorySchema = new Schema<ITracksHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist!",
    },
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Track.findById(value),
      message: "Track does not exist!",
    },
  },

  date: {
    type: Schema.Types.Date,
    default: () => Date(),
    required: true,
  },
});

export const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
