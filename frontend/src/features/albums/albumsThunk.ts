import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosApi} from "../../axiosApi";
import {IAlbum} from "../../types";

export const fetchAlbums = createAsyncThunk(
    "albums/fetch",
    async (artist?:string)=>{
        const {data} = await axiosApi<IAlbum[]>('albums?artist=' + artist);
        return data;
    }
)