import mongoose from "mongoose";

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
});

export const Artist = mongoose.model("Artist", artistSchema);
