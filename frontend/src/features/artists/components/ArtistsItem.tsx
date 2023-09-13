import React from 'react';
import {CardMedia, Paper, Typography} from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import {IArtist} from "../../../types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {setArtist} from "../../albums/albumsSlice";

interface Props{
    artist:IArtist;
}

const ArtistsItem:React.FC<Props> = ({artist}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const navigateToArtistAlbum = ()=>{
        dispatch(setArtist(artist));
        navigate('/albums/' + artist._id);
    }

    return (
        <Paper key={artist._id} elevation={3} sx={{p:"15px",":hover":{filter:"brightness(90%)"}}} onClick={navigateToArtistAlbum}>
            <CardMedia
                sx={{ height: 170,backgroundSize:"contain",mb:"15px"}}
                image={artist.image ? 'http://localhost:8001/'+ artist.image : notFoundImage}
                title={artist.name}
            />
            <Typography sx={{textAlign:'center'}}>
                {artist.name}
            </Typography>
        </Paper>
    );
};

export default ArtistsItem;