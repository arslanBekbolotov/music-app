export interface IArtist {
  _id: string;
  image: string;
  name: string;
}

export interface IAlbum {
  _id: string;
  name: string;
  release: string;
  image: string;
  count: number;
}

export interface IAlbumMutation extends IAlbum {
  artist: IArtist;
}

export interface IAlbumApi {
  albums: IAlbum[];
  artist: IArtist;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  artist: string;
  image?: string;
  number: number;
  duration: string;
  mp3File?: string;
}

export interface ITrackApi {
  tracks: ITrack[];
  album: IAlbumMutation;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface GlobalError {
  error: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

interface ITrackArtistMutation {
  _id: string;
  name: string;
}

interface ITrackAlbumMutation {
  _id: string;
  name: string;
  artist: ITrackArtistMutation;
}

interface ITrackMutation {
  _id: string;
  name: string;
  album: ITrackAlbumMutation;
}

export interface ITracksHistory {
  _id: string;
  user: string;
  track: ITrackMutation;
  date: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
