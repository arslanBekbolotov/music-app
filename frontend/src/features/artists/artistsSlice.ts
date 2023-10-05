import { createSlice } from '@reduxjs/toolkit';
import { IArtist, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { createArtist, deleteArtist, fetchArtists, publishArtist } from './artistsThunk';

interface ArtistsState {
  artists: IArtist[];
  fetchLoading: boolean;
  createArtistLoading: boolean;
  artistValidationError: ValidationError | null;
  deleteLoading: string;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  createArtistLoading: false,
  artistValidationError: null,
  deleteLoading: '',
  error: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
      state.fetchLoading = false;
      state.artists = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.createArtistLoading = true;
      state.artistValidationError = null;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createArtistLoading = false;
    });
    builder.addCase(createArtist.rejected, (state, { payload: error }) => {
      state.createArtistLoading = false;
      state.artistValidationError = error || null;
    });

    builder.addCase(publishArtist.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(publishArtist.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(publishArtist.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });

    builder.addCase(deleteArtist.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artistsStore.artists;
export const selectDeleteArtistLoading = (state: RootState) => state.artistsStore.deleteLoading;
export const selectFetchLoading = (state: RootState) => state.artistsStore.fetchLoading;
