import mongoose, { Schema } from "mongoose";

export interface IAlbum {
  name: string;
  artist: Schema.Types.ObjectId;
  release: Schema.Types.Date;
  image: string;
}

export interface IArtist {
  name: string;
  info: string;
  image: string;
}

export interface ITrack {
  name: string;
  album: Schema.Types.ObjectId;
  duration?: string;
}

export interface ITrackMutation extends ITrack {
  id: Schema.Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}

export interface ITracksHistory {
  user: Schema.Types.ObjectId;
  track: Schema.Types.ObjectId;
  date: Schema.Types.Date;
}
