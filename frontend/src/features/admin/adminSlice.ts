import {createSlice} from '@reduxjs/toolkit';
import {IAlbum, IArtist, ITrack} from '../../types';
import {fetchUnpublishedSubjects} from './adminThunk';

interface AdminState {
  albums: IAlbum[];
  artists: IArtist[];
  tracks: ITrack[];
  fetchLoading: boolean;
  error: boolean;
}

const initialState: AdminState = {
  albums: [],
  artists: [],
  tracks: [],
  fetchLoading: false,
  error: false,
};

export const adminSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUnpublishedSubjects.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUnpublishedSubjects.fulfilled, (state, {payload: adminData}) => {
      state.fetchLoading = false;
      state.albums = adminData.albums;
      state.tracks = adminData.tracks;
      state.artists = adminData.artists;
    });
    builder.addCase(fetchUnpublishedSubjects.rejected, (state) => {
      state.fetchLoading = false;
      state.error = true;
    });
  },
});

export const adminReducer = adminSlice.reducer;
