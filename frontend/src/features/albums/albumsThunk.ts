import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { IAlbumApi } from "../../types";

export const fetchAlbums = createAsyncThunk(
  "albums/fetch",
  async (artist?: string) => {
    const { data } = await axiosApi<IAlbumApi>("albums?artist=" + artist);
    return data;
  },
);
