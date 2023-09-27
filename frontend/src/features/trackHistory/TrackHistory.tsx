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
      {!trackHistory.length && <h2 style={{position:'absolute',fontSize:"35px",left:"50%",top:'38%',transform:"translateX(-50%)"}}>Your track history is empty</h2>}
    </div>
  );
};

export default TrackHistory;
