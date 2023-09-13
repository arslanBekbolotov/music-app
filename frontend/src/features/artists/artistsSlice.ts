import {createSlice} from "@reduxjs/toolkit";
import {IArtist} from "../../types";
import {RootState} from "../../app/store";
import {fetchArtists} from "./artistsThunk";

interface ArtistsState{
    artists:IArtist[],
    fetchLoading:boolean,
    error:boolean,
}

const initialState:ArtistsState = {
    artists:[],
    fetchLoading:false,
    error:false,
}

export  const artistsSlice = createSlice({
    name:"artists",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchArtists.pending,(state)=>{
            state.fetchLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled,(state,{payload:artists})=>{
            state.fetchLoading = false;
            state.artists = artists;
        });
        builder.addCase(fetchArtists.rejected,(state)=>{
            state.fetchLoading = false;
            state.error = true;
        });
    },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state:RootState)=>state.artistsStore.artists;