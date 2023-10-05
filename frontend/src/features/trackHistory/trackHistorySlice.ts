import { createSlice } from '@reduxjs/toolkit';
import { ITracksHistory } from '../../types';
import { fetchUserTracksHistory } from './trackHistoryTnunk';
import { RootState } from '../../app/store';

interface tracksHistoryState {
  trackHistory: ITracksHistory[];
  fetchLoading: boolean;
  createLoading: boolean;
  error: boolean;
}

const initialState: tracksHistoryState = {
  trackHistory: [],
  fetchLoading: false,
  createLoading: false,
  error: false,
};

export const tracksHistorySlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserTracksHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUserTracksHistory.fulfilled, (state, { payload: trackHistory }) => {
      state.fetchLoading = false;
      state.trackHistory = trackHistory;
    });
    builder.addCase(fetchUserTracksHistory.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;

export const selectCreateTrackHistoryLoading = (state: RootState) =>
  state.tracksHistoryStore.createLoading;
