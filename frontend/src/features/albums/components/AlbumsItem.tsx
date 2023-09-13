import React from 'react';
import {IAlbum} from "../../../types";
import {Box, CardMedia, Paper, Typography} from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";

interface Props{
    album:IAlbum;
    
}

const AlbumsItem:React.FC<Props> = ({album}) => {
    const navigate = useNavigate();

    return (
        <Paper key={album._id} elevation={3} sx={{p:"15px",textAlign:"center",":hover":{filter:"brightness(90%)"}}} onClick={()=>navigate('/tracks/' + album._id)}>
            <CardMedia
                sx={{ height: 170,backgroundSize:"contain",mb:"15px"}}
                image={album.image ? 'http://localhost:8001/'+ album.image : notFoundImage}
                title={album.name}
            />
            <Box>
                <Typography>
                    {album.name}
                </Typography>
                <Typography sx={{color:"#ccc",fontSize:"14px"}}>
                    {album.release}
                </Typography>
            </Box>
        </Paper>
    );
};

export default AlbumsItem;