import mongoose, { Schema, Types } from "mongoose";
import { Album } from "./Album";
import { ITrack } from "../types";
import { User } from "./User";

const trackSchema = new Schema<ITrack>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist!",
    },
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
  youtubeLink: String,
  number: {
    type: Number,
    required: true,
  },
  duration: String,
  mp3File: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Track = mongoose.model("Track", trackSchema);
