import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks } from "./tracksThunk";
import { IAlbumMutation, ITrack } from "../../types";
import { RootState } from "../../app/store";

interface tracksState {
  tracks: ITrack[];
  currentPlayingTrack: ITrack | null;
  youtubeLink: string;
  album: IAlbumMutation | null;
  fetchLoading: boolean;
  error: boolean;
}

const initialState: tracksState = {
  tracks: [],
  currentPlayingTrack: null,
  youtubeLink: "",
  album: null,
  fetchLoading: false,
  error: false,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setCurrentPlayingTrack(state, { payload: track }) {
      state.currentPlayingTrack = track;
    },
    onClose(state) {
      state.youtubeLink = "";
    },
    setYoutubeLink(state, { payload }) {
      state.youtubeLink = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, { payload: data }) => {
      state.fetchLoading = false;
      state.tracks = data.tracks;
      state.album = data.album;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const { setCurrentPlayingTrack, onClose, setYoutubeLink } =
  tracksSlice.actions;
export const selectYoutubeLink = (state: RootState) =>
  state.tracksStore.youtubeLink;
export const selectCurrentPlayingMusic = (state: RootState) =>
  state.tracksStore.currentPlayingTrack;
