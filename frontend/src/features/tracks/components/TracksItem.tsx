import React from 'react';
import {Box, CardMedia, CircularProgress, Grid, Paper, Typography} from '@mui/material';
import notFoundImage from '../../../assets/notFound.png';
import {ITrack} from '../../../types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  selectCurrentPlayingMusic,
  selectDeleteTrackLoading,
  setCurrentPlayingTrack,
  setYoutubeLink,
} from '../tracksSlice';
import IconButton from '@mui/material/IconButton';
import {selectUser} from '../../users/usersSlice';
import {createTrackHistory} from '../../trackHistory/trackHistoryTnunk';
import {selectCreateTrackHistoryLoading} from '../../trackHistory/trackHistorySlice';
import {LoadingButton} from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteTrack, fetchTracks, publishTracks} from '../tracksThunk';
import PublishIcon from '@mui/icons-material/Publish';

interface Props {
  track: ITrack;
}

const TracksItem: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteTrackLoading);
  const currentPlayingTrack = useAppSelector(selectCurrentPlayingMusic);
  const createTrackHistoryLoading = useAppSelector(selectCreateTrackHistoryLoading);

  const playTrack = () => {
    if (track.youtubeLink && track.mp3File) {
      if (window.confirm('Do you want to watch the video')) {
        dispatch(setYoutubeLink(track.youtubeLink));
      } else {
        dispatch(setCurrentPlayingTrack(track));
      }

      dispatch(createTrackHistory(track._id));
      return;
    }

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

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(deleteTrack(track._id)).unwrap();
      navigate('/');
    } catch {
      //nothing
    }
  };

  const handlePublish = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(publishTracks(track._id)).unwrap();
      await dispatch(fetchTracks(id));
    } catch {
      //nothing
    }
  };

  if (
    track.isPublished ||
    (!track.isPublished && (user?.role === 'admin' || user?._id === track.user))
  ) {
    return (
      <Paper
        key={track._id}
        elevation={3}
        sx={{
          p: '15px',
          ':hover': {filter: 'brightness(90%)'},
          position: 'relative',
        }}
      >
        <Box sx={{position: 'relative'}}>
          <CardMedia
            sx={{height: 170, backgroundSize: 'contain', mb: '15px'}}
            image={track.image ? 'http://localhost:8001/' + track.image : notFoundImage}
            title={track.name}
          />
          {user && currentPlayingTrack !== track && (
            <IconButton
              onClick={() => playTrack()}
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: '#121212',
                ':hover': {bgcolor: '#1DB954'},
                fontSize: '25px',
              }}
            >
              {createTrackHistoryLoading ? <CircularProgress size="small" /> : <PlayArrowIcon />}
            </IconButton>
          )}
        </Box>

        <Grid container item justifyContent="space-evenly" sx={{mb: '5px'}}>
          <Typography>{track.number + '.' + track.name}</Typography>
          <Typography>{track.duration}</Typography>
        </Grid>
        <Grid item container justifyContent="center">
          {user && (user.role === 'admin' || user._id === track.user) && (
            <LoadingButton
              onClick={handleDelete}
              startIcon={<DeleteForeverIcon />}
              loading={deleteLoading === track._id}
              disabled={!!deleteLoading.length}
              color="error"
              variant="contained"
              size="small"
            >
              Delete
            </LoadingButton>
          )}
          {user?.role === 'admin' && (
            <LoadingButton
              onClick={handlePublish}
              endIcon={<PublishIcon />}
              loading={deleteLoading === track._id}
              disabled={!!deleteLoading.length}
              color={track.isPublished ? 'warning' : 'success'}
              sx={{color: '#fff', ml: '10px'}}
              variant="contained"
              size="small"
            >
              {track.isPublished ? 'Cancel' : 'Publish'}
            </LoadingButton>
          )}
        </Grid>
        {(user?.role === 'admin' || (user?._id === track.user && !track.isPublished)) && (
          <span
            style={{
              border: '1px solid #ccc',
              backgroundColor: '#121212',
              padding: '5px 10px',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            {track.isPublished ? 'Published' : 'Unpublished'}
          </span>
        )}
      </Paper>
    );
  }
  return null;
};

export default TracksItem;
