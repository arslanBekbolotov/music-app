import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import { ITrackApi, ITrackFormMutation, ValidationError } from "../../types";
import { isAxiosError } from "axios";

export const fetchTracks = createAsyncThunk(
  "tracks/fetch",
  async (album?: string) => {
    const { data } = await axiosApi<ITrackApi>("tracks?album=" + album);
    return data;
  },
);

export const createTrack = createAsyncThunk<
  void,
  ITrackFormMutation,
  { rejectValue: ValidationError }
>("track/create", async (trackData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(trackData) as (keyof ITrackFormMutation)[];

    keys.forEach((key) => {
      const value = trackData[key];

      if (value) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("tracks", formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const publishTracks = createAsyncThunk<void, string>(
  "tracks/patch",
  async (id) => {
    try {
      await axiosApi.patch(`tracks/${id}/togglePublished`);
    } catch (e) {
      throw e;
    }
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  "tracks/delete",
  async (id) => {
    try {
      await axiosApi.delete(`tracks/${id}`);
    } catch (e) {
      throw e;
    }
  },
);
