import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentPlayingTrack } from "../features/tracks/tracksSlice";
import { useEffect, useRef, useState } from "react";
import { selectArtist } from "../features/albums/albumsSlice";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const { currentPlayingTrack } = useAppSelector((state) => state.tracksStore);
  const audioPlay = useRef<HTMLAudioElement | null>(null);
  const artist = useAppSelector(selectArtist);
  let interval: NodeJS.Timer;

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  useEffect(() => {
    if (audioPlay.current?.duration) {
      setDuration(Math.floor(audioPlay.current.duration));
    }
  }, [audioPlay?.current?.onloadedmetadata]);

  if (currentPlayingTrack !== null && !currentPlayingTrack?.mp3File) {
    return <Widget sx={{ mb: "20px" }}>Плейер не найден</Widget>;
  }

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const closePlayer = () => {
    dispatch(setCurrentPlayingTrack(null));
    clearInterval(interval);
    setPaused(true);
  };

  const onChangeProgress = (value: number) => {
    setPosition(value);
    if (audioPlay.current?.currentTime) {
      audioPlay.current.currentTime = value;
    }
  };

  const togglePlay = () => {
    const prevValue = paused;
    setPaused(!prevValue);

    if (prevValue) {
      audioPlay.current?.play();
      interval = setInterval(() => {
        if (audioPlay.current?.currentTime) {
          setPosition(Math.floor(audioPlay.current.currentTime));
        }
      }, 1000);
    } else {
      audioPlay.current?.pause();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "absolute",
        bottom: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        display: `${!currentPlayingTrack && "none"}`,
      }}
    >
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography noWrap fontSize={18} letterSpacing={-0.25}>
              {currentPlayingTrack?.name}
            </Typography>
            <Typography color="text.secondary" fontSize={14} fontWeight={400}>
              {artist ? artist.name : null}
            </Typography>
          </Box>
          <IconButton sx={{ ml: "auto" }} onClick={closePlayer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => onChangeProgress(value as number)}
        />
        {currentPlayingTrack && (
          <audio
            ref={audioPlay}
            src={"http://localhost:8001/" + currentPlayingTrack.mp3File}
            preload="metadata"
          ></audio>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton onClick={() => togglePlay()}>
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
        </Box>
      </Widget>
    </Box>
  );
};

export default MusicPlayer;
