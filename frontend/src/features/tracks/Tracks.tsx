import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { fetchTracks } from "./tracksThunk";
import { Box, Skeleton, Typography } from "@mui/material";
import TracksItem from "./components/TracksItem";
import MusicPlayer from "../../components/Player";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const { tracks, fetchLoading, album } = useAppSelector(
    (state) => state.tracksStore,
  );

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4" component="h2" sx={{ mb: "20px", mr: "3px" }}>
          {album && album.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="span"
          color="sesondary.text"
          sx={{ mb: "20px" }}
        >
          {album?.artist && album.artist.name}
        </Typography>
      </Box>
      <MusicPlayer />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {fetchLoading
          ? Array.from(new Array(12)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={265}
                height={260}
              />
            ))
          : tracks.map((track) => <TracksItem key={track._id} track={track} />)}
      </div>
    </div>
  );
};

export default Tracks;
