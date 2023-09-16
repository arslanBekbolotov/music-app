import React from "react";
import {
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import { ITrack } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  selectCurrentPlayingMusic,
  setCurrentPlayingTrack,
  setYoutubeLink,
} from "../tracksSlice";
import IconButton from "@mui/material/IconButton";
import { selectUser } from "../../users/usersSlice";
import { createTrackHistory } from "../../trackHistory/trackHistoryTnunk";
import { selectCreateTrackHistoryLoading } from "../../trackHistory/trackHistorySlice";

interface Props {
  track: ITrack;
}

const TracksItem: React.FC<Props> = ({ track }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const currentPlayingTrack = useAppSelector(selectCurrentPlayingMusic);
  const createTrackHistoryLoading = useAppSelector(
    selectCreateTrackHistoryLoading,
  );

  const playTrack = () => {
    if (track.youtubeLink) {
      dispatch(setYoutubeLink(track.youtubeLink));
      dispatch(createTrackHistory(track._id));
      return;
    }

    if (track.mp3File) {
      dispatch(setCurrentPlayingTrack(track));
    }
    dispatch(createTrackHistory(track._id));
  };

  return (
    <Paper
      key={track._id}
      elevation={3}
      sx={{ p: "15px", ":hover": { filter: "brightness(90%)" } }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ height: 170, backgroundSize: "contain", mb: "15px" }}
          image={
            track.image ? "http://localhost:8001/" + track.image : notFoundImage
          }
          title={track.name}
        />
        {user && currentPlayingTrack !== track && (
          <IconButton
            onClick={() => playTrack()}
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "#121212",
              ":hover": { bgcolor: "#1DB954" },
              fontSize: "25px",
            }}
          >
            {createTrackHistoryLoading ? (
              <CircularProgress size="small" />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>
        )}
      </Box>

      <Grid container item>
        <Typography sx={{ textAlign: "start" }}>{track.number}.</Typography>
        <Typography sx={{ textAlign: "center" }}>{track.name}</Typography>
      </Grid>
      <Typography sx={{ textAlign: "center" }}>{track.duration}</Typography>
    </Paper>
  );
};

export default TracksItem;
