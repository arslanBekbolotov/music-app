export interface IArtist{
    _id:string,
    image:string,
    name:string,
}

export interface IAlbum{
    _id:string,
    name:string,
    release:string,
    artist:IArtist,
    image:string,
}

export interface IAlbumApi{

}