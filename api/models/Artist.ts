import mongoose, {HydratedDocument, Types} from 'mongoose';
import {IArtist} from '../types';
import {User} from './User';

const Schema = mongoose.Schema;

const artistSchema = new Schema<IArtist>({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<IArtist>, value: string) {
        if (!this.isModified('name')) return true;
        const artist = await Artist.findOne({name: value});
        if (artist) return false;
      },
      message: 'This name is already taken',
    },
  },
  info: String,
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Artist = mongoose.model('Artist', artistSchema);
