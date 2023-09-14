import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import {  ITrackApi } from "../../types";

export const fetchTracks = createAsyncThunk(
  "tracks/fetch",
  async (album?: string) => {
    const { data } = await axiosApi<ITrackApi>("tracks?album=" + album);
    return data;
  },
);
