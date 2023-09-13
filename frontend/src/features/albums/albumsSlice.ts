import {createSlice} from "@reduxjs/toolkit";
import {IAlbum} from "../../types";
import {fetchAlbums} from "./albumsThunk";

interface AlbumsState{
    albums:IAlbum[],
    fetchLoading:boolean,
    error:boolean,
}

const initialState:AlbumsState = {
    albums:[],
    fetchLoading:false,
    error:false,
}

export  const albumsSlice = createSlice({
    name:"albums",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAlbums.pending,(state)=>{
            state.fetchLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled,(state,{payload:albums})=>{
            state.fetchLoading = false;
            state.albums = albums;
        });
        builder.addCase(fetchAlbums.rejected,(state)=>{
            state.fetchLoading = false;
            state.error = true;
        });
    },
});

export const albumsReducer = albumsSlice.reducer;