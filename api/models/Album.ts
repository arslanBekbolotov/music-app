import mongoose, { Schema, Types } from "mongoose";
import { Artist } from "./Artist";
import { IAlbum } from "../types";

const albumSchema = new Schema<IAlbum>({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Artist",
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: "Artist does not exist!",
    },
  },
  release: {
    type: String,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Album = mongoose.model<IAlbum>("Album", albumSchema);
