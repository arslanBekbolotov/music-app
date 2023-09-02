import mongoose, { Types } from "mongoose";
import { Album } from "./Album";

const Schema = mongoose.Schema;

const trackSchema = new Schema({
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
  duration: String,
});

export const Track = mongoose.model("Track", trackSchema);
