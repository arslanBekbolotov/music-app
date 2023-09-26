import { createSlice } from "@reduxjs/toolkit";
import {IAlbum, IArtistMutation} from "../../types";
import {createAlbum, fetchAlbums} from "./albumsThunk";

interface AlbumsState {
  albums: IAlbum[];
  artist: IArtistMutation | null;
  fetchLoading: boolean;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  artist: null,
  fetchLoading: false,
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
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, { payload: data }) => {
      state.fetchLoading = false;
      state.albums = data.albums;
      state.artist = data.artist;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const { setArtist } = albumsSlice.actions;

