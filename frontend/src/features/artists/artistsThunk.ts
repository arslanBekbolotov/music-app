import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist, IArtistFormMutation, ValidationError } from '../../types';
import { axiosApi } from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk('artists/fetch', async () => {
  const { data } = await axiosApi<IArtist[]>('artists');
  return data;
});

export const createArtist = createAsyncThunk<
  void,
  IArtistFormMutation,
  { rejectValue: ValidationError }
>('artist/create', async (artistData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(artistData) as (keyof IArtistFormMutation)[];

    keys.forEach((key) => {
      const value = artistData[key];

      if (value) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('artists', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const publishArtist = createAsyncThunk<void, string>('artists/patch', async (id) => {
  await axiosApi.patch(`artists/${id}/togglePublished`);
});

export const deleteArtist = createAsyncThunk<void, string>('artists/delete', async (id) => {
  await axiosApi.delete(`artists/${id}`);
});
