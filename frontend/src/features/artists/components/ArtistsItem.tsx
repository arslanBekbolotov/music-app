import React from 'react';
import {CardMedia, Grid, Paper, Typography} from '@mui/material';
import notFoundImage from '../../../assets/notFound.png';
import {IArtist} from '../../../types';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {LoadingButton} from '@mui/lab';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {selectUser} from '../../users/usersSlice';
import {selectDeleteArtistLoading} from '../artistsSlice';
import {deleteArtist, fetchArtists, publishArtist} from '../artistsThunk';
import {BASE_URL} from '../../../constansts';

interface Props {
  artist: IArtist;
}

const ArtistsItem: React.FC<Props> = ({artist}) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteArtistLoading);
  const dispatch = useAppDispatch();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(deleteArtist(artist._id)).unwrap();
      await dispatch(fetchArtists());
    } catch {
      //nothing
    }
  };

  const handlePublish = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(publishArtist(artist._id)).unwrap();
      await dispatch(fetchArtists());
    } catch {
      //nothing
    }
  };

  const navigateToArtistAlbum = () => {
    navigate('/albums/' + artist._id);
  };

  if (
    artist.isPublished ||
    (!artist.isPublished && (user?.role === 'admin' || user?._id === artist.user))
  ) {
    return (
      <Paper
        key={artist._id}
        elevation={3}
        sx={{
          p: '15px',
          position: 'relative',
          ':hover': {filter: 'brightness(90%)'},
        }}
        onClick={navigateToArtistAlbum}
      >
        <CardMedia
          sx={{height: 170, backgroundSize: 'contain', mb: '15px'}}
          image={artist.image ? BASE_URL + artist.image : notFoundImage}
          title={artist.name}
        />
        <Typography sx={{textAlign: 'center', mb: '10px'}}>{artist.name}</Typography>
        {(user?.role === 'admin' || (user?._id === artist.user && !artist.isPublished)) && (
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
            {artist.isPublished ? 'Published' : 'Unpublished'}
          </span>
        )}
        <Grid item container justifyContent="center">
          {user && (user.role === 'admin' || user._id === artist.user) && (
            <LoadingButton
              onClick={handleDelete}
              startIcon={<DeleteForeverIcon />}
              loading={deleteLoading === artist._id}
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
              loading={deleteLoading === artist._id}
              disabled={!!deleteLoading.length}
              color={artist.isPublished ? 'warning' : 'success'}
              sx={{color: '#fff', ml: '10px'}}
              variant="contained"
              size="small"
            >
              {artist.isPublished ? 'Cancel' : 'Publish'}
            </LoadingButton>
          )}
        </Grid>
      </Paper>
    );
  }

  return null;
};

export default ArtistsItem;
