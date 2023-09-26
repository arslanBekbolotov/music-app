import mongoose, { Types } from "mongoose";
import { IArtist } from "../types";
import { User } from "./User";

const Schema = mongoose.Schema;

const artistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
  },
  info: String,
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist!",
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Artist = mongoose.model("Artist", artistSchema);
