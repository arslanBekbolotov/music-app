import { createSlice } from '@reduxjs/toolkit';
import { IAlbum, IArtistMutation } from '../../types';
import {
  createAlbum,
  deleteAlbum,
  fetchAlbumsByQuery,
  fetchAllAlbums,
  publishAlbum,
} from './albumsThunk';
import { RootState } from '../../app/store';

interface AlbumsState {
  albums: IAlbum[];
  artist: IArtistMutation | null;
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: string;
  error: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  artist: null,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: '',
  error: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByQuery.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbumsByQuery.fulfilled, (state, { payload: data }) => {
      state.fetchLoading = false;
      if (data.albums) {
        state.albums = data.albums;
        state.artist = data.artist;
      } else {
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

    builder.addCase(publishAlbum.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(publishAlbum.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(publishAlbum.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });

    builder.addCase(deleteAlbum.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumCreateLoading = (state: RootState) => state.albumsStore.createLoading;

export const selectAlbumDeleteLoading = (state: RootState) => state.albumsStore.deleteLoading;
export const selectAlbums = (state: RootState) => state.albumsStore.albums;
