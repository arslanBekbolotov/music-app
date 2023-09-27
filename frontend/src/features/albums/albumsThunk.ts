import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import {IAlbum, IAlbumApi, IAlbumFormMutation} from "../../types";

export const fetchAllAlbums = createAsyncThunk(
    "albums/fetchAll",
    async () => {
        const { data } = await axiosApi<IAlbum[]>("albums");
        return data;
    },
);

export const fetchAlbumsByQuery = createAsyncThunk(
  "albums/fetchByQuery",
  async (artist:string) => {
    const { data } = await axiosApi<IAlbumApi>("albums?artist=" + artist);
    return data;
  },
);

export const createAlbum = createAsyncThunk<void, IAlbumFormMutation>(
    "albums/create",
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
