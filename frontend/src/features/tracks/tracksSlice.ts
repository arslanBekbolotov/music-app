import {createSlice} from '@reduxjs/toolkit';
import {createTrack, deleteTrack, fetchTracks, publishTracks} from './tracksThunk';
import {IAlbumMutation, ITrack, ValidationError} from '../../types';
import {RootState} from '../../app/store';

interface tracksState {
  tracks: ITrack[];
  currentPlayingTrack: ITrack | null;
  youtubeLink: string;
  album: IAlbumMutation | null;
  fetchLoading: boolean;
  createTrackLoading: boolean;
  error: boolean;
  deleteLoading: string;
  tracksValidationError: ValidationError | null;
  paused: boolean;
  position: number;
  volume: number;
}

const initialState: tracksState = {
  tracks: [],
  currentPlayingTrack: null,
  youtubeLink: '',
  album: null,
  fetchLoading: false,
  createTrackLoading: false,
  error: false,
  deleteLoading: '',
  tracksValidationError: null,
  paused: true,
  position: 0,
  volume: 50,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentPlayingTrack(state, {payload: track}) {
      state.currentPlayingTrack = track;
    },
    setPaused(state, {payload}) {
      state.paused = payload;
    },
    setPosition(state, {payload}) {
      state.position = payload;
    },
    setVolume(state, {payload}) {
      state.volume = payload;
    },
    onClose(state) {
      state.youtubeLink = '';
    },
    setYoutubeLink(state, {payload}) {
      state.youtubeLink = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.tracks = data.tracks;
      state.album = data.album;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });

    builder.addCase(createTrack.pending, (state) => {
      state.createTrackLoading = true;
      state.tracksValidationError = null;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createTrackLoading = false;
    });
    builder.addCase(createTrack.rejected, (state, {payload: error}) => {
      state.createTrackLoading = false;
      state.tracksValidationError = error || null;
    });

    builder.addCase(publishTracks.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(publishTracks.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(publishTracks.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });

    builder.addCase(deleteTrack.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteTrack.fulfilled, (state) => {
      state.deleteLoading = '';
    });
    builder.addCase(deleteTrack.rejected, (state) => {
      state.deleteLoading = '';
      state.error = true;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {setCurrentPlayingTrack, onClose, setYoutubeLink, setPaused, setPosition, setVolume} =
  tracksSlice.actions;
export const selectYoutubeLink = (state: RootState) => state.tracksStore.youtubeLink;

export const selectDeleteTrackLoading = (state: RootState) => state.tracksStore.deleteLoading;
export const selectCurrentPlayingMusic = (state: RootState) =>
  state.tracksStore.currentPlayingTrack;
export const selectPaused = (state: RootState) => state.tracksStore.paused;
export const selectPosition = (state: RootState) => state.tracksStore.position;
export const selectVolume = (state: RootState) => state.tracksStore.volume;
