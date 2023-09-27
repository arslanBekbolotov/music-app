import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { ITracksHistory } from "../../types";

export const createTrackHistory = createAsyncThunk<void, string>(
  "trackHistory/create",
  async (trackId) => {
    await axiosApi.post("track_history", { track: trackId });
  },
);

export const fetchUserTracksHistory = createAsyncThunk(
  "trackHistory/fetch",
  async () => {
    const { data } = await axiosApi<ITracksHistory[]>("track_history");
    return data;
  },
);
