import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserTracksHistory } from "./trackHistoryTnunk";
import TrackHistoryItem from "./components/TrackHistoryItem";
import Spinner from "../../components/Spinner";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { trackHistory, fetchLoading } = useAppSelector(
    (state) => state.tracksHistoryStore,
  );

  useEffect(() => {
    dispatch(fetchUserTracksHistory());

    if (!user) {
      navigate("/");
    }
  }, [dispatch, user, navigate]);

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
