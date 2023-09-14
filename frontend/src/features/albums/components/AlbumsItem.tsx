import React from "react";
import { IAlbum } from "../../../types";
import { Box, CardMedia, Paper, Typography } from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import { useNavigate } from "react-router-dom";

interface Props {
  album: IAlbum;
}

const AlbumsItem: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <Paper
      key={album._id}
      elevation={3}
      sx={{
        p: "15px",
        position: "relative",
        textAlign: "center",
        ":hover": { filter: "brightness(90%)" },
      }}
      onClick={() => navigate("/tracks/" + album._id)}
    >
      <CardMedia
        sx={{ height: 170, backgroundSize: "contain", mb: "15px" }}
        image={
          album.image ? "http://localhost:8001/" + album.image : notFoundImage
        }
        title={album.name}
      />
      <span
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          padding: "4px 12px",
          color: "#000",
          borderRadius: "50%",
          backgroundColor: "#ccc",
        }}
      >
        {album.count}
      </span>
      <Box>
        <Typography>{album.name}</Typography>
        <Typography sx={{ color: "#ccc", fontSize: "14px" }}>
          {album.release}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AlbumsItem;
