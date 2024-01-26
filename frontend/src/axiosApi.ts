import axios, {AxiosHeaders} from 'axios';
import {RootState} from './app/store';
import {Store} from '@reduxjs/toolkit';

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().usersStore.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

export const axiosApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});
