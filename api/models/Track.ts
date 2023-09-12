import mongoose, { Schema, Types } from "mongoose";
import { Album } from "./Album";
import { ITrack } from "../types";

const trackSchema = new Schema<ITrack>({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Album",
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: "Album does not exist!",
    },
  },
  image: String,
  number: {
    type: Number,
    required: true,
  },
  duration: String,
  mp3File: String,
});

export const Track = mongoose.model("Track", trackSchema);
