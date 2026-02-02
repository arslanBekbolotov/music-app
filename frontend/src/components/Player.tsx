import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  setCurrentPlayingTrack,
  setPaused,
  setPosition,
  setVolume,
} from '../features/tracks/tracksSlice';
import {useEffect, useRef, useState} from 'react';
import {
  FastForwardRounded,
  FastRewindRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import {CardMedia, Stack} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Widget = styled('div')(({theme}) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'fixed',
  bottom: 16,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const MusicPlayer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [duration, setDuration] = useState(0);
  const {currentPlayingTrack, album, tracks, position, paused, volume} = useAppSelector(
    (state) => state.tracksStore,
  );
  const audioPlay = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  useEffect(() => {
    if (audioPlay.current?.duration) {
      setDuration(Math.floor(audioPlay.current.duration));
    }
  }, [currentPlayingTrack]);

  if (currentPlayingTrack !== null && !currentPlayingTrack?.mp3File) {
    return <Widget sx={{mb: '20px'}}>Плейер не найден</Widget>;
  }

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const closePlayer = () => {
    dispatch(setCurrentPlayingTrack(null));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    dispatch(setPaused(true));
  };

  const onChangeProgress = (value: number) => {
    if (audioPlay.current?.currentTime) {
      dispatch(setPosition(value));
      audioPlay.current.currentTime = value;
    }
  };

  const onChangeVolume = (value: number) => {
    if (audioPlay.current?.volume || audioPlay.current?.volume === 0) {
      dispatch(setVolume(value));
      audioPlay.current.volume = value / 100;
    }
  };

  const togglePlay = () => {
    const wasPaused = paused;
    dispatch(setPaused(!wasPaused));
    if (wasPaused) {
      void audioPlay.current?.play();
      intervalRef.current = setInterval(() => {
        if (audioPlay.current?.currentTime) {
          dispatch(setPosition(Math.floor(audioPlay.current.currentTime)));
        }
      }, 1000);
    } else {
      audioPlay.current?.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const changeSong = (isPrevious?: boolean) => {
    const filteredSong = tracks.filter((item) => item.mp3File);
    const index = filteredSong.findIndex((item) => item === currentPlayingTrack);

    dispatch(setPaused(true));
    if (audioPlay.current?.duration) {
      setDuration(Math.floor(audioPlay.current.duration));
    }

    if (isPrevious && index) {
      dispatch(setCurrentPlayingTrack(filteredSong[index - 1]));
      return;
    }

    if (!isPrevious && filteredSong[index + 1]) {
      dispatch(setCurrentPlayingTrack(filteredSong[index + 1]));
      return;
    }

    dispatch(setPaused(false));
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: `${!currentPlayingTrack ? 'none' : 'block'}`,
      }}
    >
      <Widget>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <CoverImage>
            <CardMedia
              sx={{height: 140}}
              image={currentPlayingTrack?.image}
              title={currentPlayingTrack?.name}
            />
          </CoverImage>
          <Box sx={{ml: 1.5, minWidth: 0}}>
            <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
              {currentPlayingTrack?.name}
            </Typography>
            <Typography noWrap>
              <b>{album?.artist && album.artist.name}</b>
            </Typography>
          </Box>
          <IconButton sx={{ml: 'auto'}} onClick={closePlayer}>
            <CloseIcon />
          </IconButton>
        </Box>
        {currentPlayingTrack && (
          <audio ref={audioPlay} src={currentPlayingTrack.mp3File} preload="metadata"></audio>
        )}
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => onChangeProgress(value as number)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <Typography variant="body2">{formatDuration(position)}</Typography>
          <Typography variant="body2">-{formatDuration(duration - position)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={() => changeSong(true)}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton onClick={() => togglePlay()}>
            {paused ? (
              <PlayArrowRounded sx={{fontSize: '3rem'}} htmlColor={mainIconColor} />
            ) : (
              <PauseRounded sx={{fontSize: '3rem'}} htmlColor={mainIconColor} />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={() => changeSong()}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{mb: 1, px: 1}} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            value={volume}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            }}
            onChange={(_, value) => onChangeVolume(value as number)}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
};

export default MusicPlayer;
