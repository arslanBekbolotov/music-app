import React, {useEffect} from 'react';
import {Skeleton} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectArtists, selectFetchLoading} from './artistsSlice';
import {fetchArtists} from './artistsThunk';
import ArtistsItem from './components/ArtistsItem';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const fetchLoading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '30px',
      }}
    >
      {fetchLoading &&
        (Array.from(new Array(12)).map((item, index) => (
          <Skeleton key={index} variant="rounded" width={265} height={260} />
        )))}
      {fetchLoading || artists && artists.map((artist) => <ArtistsItem key={artist._id} artist={artist} />)}
    </div>
  );
};

export default Artists;
