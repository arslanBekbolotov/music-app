import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import {IAlbumApi, IAlbumFormMutation} from "../../types";

export const fetchAlbums = createAsyncThunk(
  "albums/fetch",
  async (artist?: string) => {
    const { data } = await axiosApi<IAlbumApi>("albums?artist=" + artist);
    return data;
  },
);

export const createAlbum = createAsyncThunk<void, IAlbumFormMutation>(
    "product/createPost",
    async (albumData) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(albumData) as (keyof IAlbumFormMutation)[];

            keys.forEach((key) => {
                const value = albumData[key];

                if (value) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post("/albums", formData);
        } catch (e) {
           throw e
        }
    },
);
