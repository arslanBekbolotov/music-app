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
  image?: string;
  number: number;
  duration: string;
  mp3File?: string;
}

export interface ITrackApi {
  tracks: ITrack[];
  album: IAlbumMutation;
}
