import { Schema } from "mongoose";

export interface IAlbum {
  name: string;
  artist: Schema.Types.ObjectId;
  release: string;
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
  number: number;
  duration?: string;
  image?: string;
  mp3File?: string;
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
