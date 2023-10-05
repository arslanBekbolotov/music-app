import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TrackHistoryItem from './components/TrackHistoryItem';
import Spinner from '../../components/Spinner';
import { fetchUserTracksHistory } from './trackHistoryTnunk';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const { trackHistory, fetchLoading } = useAppSelector((state) => state.tracksHistoryStore);

  useEffect(() => {
    dispatch(fetchUserTracksHistory());
  }, [dispatch]);

  return (
    <div>
      {fetchLoading ? (
        <Spinner />
      ) : (
        trackHistory.map((item) => <TrackHistoryItem key={item._id} trackHistory={item} />)
      )}
      {!trackHistory.length && (
        <h2
          style={{
            position: 'absolute',
            fontSize: '35px',
            left: '50%',
            top: '38%',
            transform: 'translateX(-50%)',
          }}
        >
          Your track history is empty
        </h2>
      )}
    </div>
  );
};

export default TrackHistory;
