import { createSlice } from "@reduxjs/toolkit";
import {IAlbum, IArtistMutation} from "../../types";
import {createAlbum, fetchAlbumsByQuery, fetchAllAlbums} from "./albumsThunk";
import {RootState} from "../../app/store";

interface AlbumsState {
  albums: IAlbum[];
  artist: IArtistMutation | null;
  fetchLoading: boolean;
  createLoading:boolean;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  artist: null,
  fetchLoading: false,
  createLoading:false,
  error: false,
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setArtist(state, { payload: artist }) {
      state.artist = artist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByQuery.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbumsByQuery.fulfilled, (state, { payload: data }) => {
      state.fetchLoading = false;
      if(data.albums){
        state.albums = data.albums;
        state.artist = data.artist;
      }else{
        state.albums = [];
      }
    });
    builder.addCase(fetchAlbumsByQuery.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(fetchAllAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAllAlbums.fulfilled, (state, { payload: albums }) => {
      state.fetchLoading = false;
      state.albums = albums;
    });
    builder.addCase(fetchAllAlbums.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.createLoading = false;
      state.error = true;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumCreateLoading = (state: RootState) => state.albumsStore.createLoading;
export const selectAlbums = (state: RootState) => state.albumsStore.albums;
export const { setArtist } = albumsSlice.actions;

