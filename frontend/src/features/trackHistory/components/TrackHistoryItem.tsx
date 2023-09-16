import React from "react";
import { ITracksHistory } from "../../../types";
import { Paper, Typography } from "@mui/material";

interface Props {
  trackHistory: ITracksHistory;
}

const TrackHistoryItem: React.FC<Props> = ({ trackHistory }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: "10px",
        p: "4px 10px",
      }}
    >
      <Typography variant="h6" component="span">
        {trackHistory.track.album.artist.name}
      </Typography>
      <Typography variant="h6" component="span">
        {trackHistory.track.name}
      </Typography>
      <Typography variant="subtitle2" component="span" color={"secondary.text"}>
        {trackHistory.date}
      </Typography>
    </Paper>
  );
};

export default TrackHistoryItem;
