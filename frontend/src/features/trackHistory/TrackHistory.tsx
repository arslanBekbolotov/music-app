import React from "react";
import {useAppSelector} from "../../app/hooks";
import TrackHistoryItem from "./components/TrackHistoryItem";
import Spinner from "../../components/Spinner";

const TrackHistory = () => {
  const { trackHistory, fetchLoading } = useAppSelector(
    (state) => state.tracksHistoryStore,
  );

  return (
    <div>
      {fetchLoading ? (
        <Spinner />
      ) : (
        trackHistory.map((item) => (
          <TrackHistoryItem key={item._id} trackHistory={item} />
        ))
      )}
    </div>
  );
};

export default TrackHistory;
