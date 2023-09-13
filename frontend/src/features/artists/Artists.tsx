import React, {useEffect} from 'react';
import {CardMedia, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists} from "./artistsSlice";
import {fetchArtists} from "./artistsThunk";
import notFoundImage from "../../assets/notFound.png";
import {useNavigate} from "react-router-dom";
import {fetchAlbums} from "../albums/albumsThunk";

const Artists = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchArtists());
    }, []);

    const artists = useAppSelector(selectArtists);
    return (
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gridTemplateRows:"repeat(3, 1fr)",gap:"30px"}}>
            {artists.map(artist =>(
                <Paper key={artist._id} elevation={3} sx={{p:"15px"}} onClick={()=>navigate('/albums' + artist._id)}>
                    <CardMedia
                        sx={{ height: 170,backgroundSize:"contain",mb:"15px"}}
                        image={artist.image ? 'http://localhost:8001/'+ artist.image : notFoundImage}
                        title={artist.name}
                    />
                    <Typography sx={{textAlign:'center'}}>
                        {artist.name}
                    </Typography>
                </Paper>
            ))}
        </div>
    );
};

export default Artists;