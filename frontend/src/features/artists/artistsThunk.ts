import { createAsyncThunk } from "@reduxjs/toolkit";
import { IArtist } from "../../types";
import { axiosApi } from "../../axiosApi";

export const fetchArtists = createAsyncThunk("artists/fetch", async () => {
  const { data } = await axiosApi<IArtist[]>("artists");
  return data;
});
