import mongoose from "mongoose";
import { IArtist } from "../types";

const Schema = mongoose.Schema;

const artistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
  },
  info: String,
  image: String,
});

export const Artist = mongoose.model("Artist", artistSchema);
