import React from "react";
import { CardMedia, Grid, Paper, Typography } from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import { ITrack } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { setCurrentPlayingTrack } from "../tracksSlice";

interface Props {
  track: ITrack;
}

const TracksItem: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const onClickTrack = () => {
    if (track.mp3File) {
      dispatch(setCurrentPlayingTrack(track));
    }
  };

  return (
    <Paper
      key={track._id}
      elevation={3}
      sx={{ p: "15px", ":hover": { filter: "brightness(90%)" } }}
      onClick={() => onClickTrack()}
    >
      <CardMedia
        sx={{ height: 170, backgroundSize: "contain", mb: "15px" }}
        image={
          track.image ? "http://localhost:8001/" + track.image : notFoundImage
        }
        title={track.name}
      />
      <Grid container item>
        <Typography sx={{ textAlign: "start" }}>{track.number}.</Typography>
        <Typography sx={{ textAlign: "center" }}>{track.name}</Typography>
      </Grid>
      <Typography sx={{ textAlign: "center" }}>{track.duration}</Typography>
    </Paper>
  );
};

export default TracksItem;
