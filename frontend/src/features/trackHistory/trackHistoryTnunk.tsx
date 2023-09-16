import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { ITracksHistory } from "../../types";

export const createTrackHistory = createAsyncThunk<void, string>(
  "trackHistory/create",
  async (trackId) => {
    const user = JSON.parse(localStorage.getItem("persist:store:users")!).user;
    const token = JSON.parse(user).token;

    await axiosApi.post(
      "track_history",
      { track: trackId },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  },
);

export const fetchUserTracksHistory = createAsyncThunk(
  "trackHistory/fetch",
  async () => {
    const user = JSON.parse(localStorage.getItem("persist:store:users")!).user;
    const token = JSON.parse(user).token;

    const { data } = await axiosApi<ITracksHistory[]>("track_history", {
      headers: {
        Authorization: token,
      },
    });

    return data;
  },
);
