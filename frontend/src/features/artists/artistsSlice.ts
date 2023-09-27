import { createSlice } from "@reduxjs/toolkit";
import {IArtist, ValidationError} from "../../types";
import { RootState } from "../../app/store";
import {createArtist, fetchArtists} from "./artistsThunk";

interface ArtistsState {
  artists: IArtist[];
  fetchLoading: boolean;
  createArtistLoading:boolean;
  artistValidationError:ValidationError | null;
  error: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  createArtistLoading:false,
  artistValidationError:null,
  error: false,
};

export const artistsSlice = createSlice({
  name: "artists",
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
    builder.addCase(createArtist.rejected, (state,{payload:error}) => {
      state.createArtistLoading = false;
      state.artistValidationError = error || null;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artistsStore.artists;
export const selectArtistCreateLoading = (state: RootState) => state.artistsStore.createArtistLoading;
export const selectFetchLoading = (state: RootState) =>
  state.artistsStore.fetchLoading;
