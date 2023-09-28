import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PublishIcon from "@mui/icons-material/Publish";
import { deleteAlbum, publishAlbum } from "../../albums/albumsThunk";
import { deleteTrack, publishTracks } from "../../tracks/tracksThunk";
import { deleteArtist, publishArtist } from "../../artists/artistsThunk";
import { fetchUnpublishedSubjects } from "../adminThunk";
import { IAlbum, IArtist, ITrack } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAlbumDeleteLoading } from "../../albums/albumsSlice";
import { selectDeleteTrackLoading } from "../../tracks/tracksSlice";
import { selectDeleteArtistLoading } from "../../artists/artistsSlice";

interface Props {
  item: IArtist | IAlbum | ITrack;
  subjectName: string;
}

const AdminTableRow: React.FC<Props> = ({ item, subjectName }) => {
  const dispatch = useAppDispatch();
  const albumDeleteLoading = useAppSelector(selectAlbumDeleteLoading);
  const trackDeleteLoading = useAppSelector(selectDeleteTrackLoading);
  const artistDeleteLoading = useAppSelector(selectDeleteArtistLoading);
  const deleteLoading =
    albumDeleteLoading || artistDeleteLoading || trackDeleteLoading;

  const handleDelete = async () => {
    try {
      if (subjectName === "album") {
        await dispatch(deleteAlbum(item._id)).unwrap();
      } else if (subjectName === "track") {
        await dispatch(deleteTrack(item._id)).unwrap();
      } else {
        await dispatch(deleteArtist(item._id)).unwrap();
      }

      await dispatch(fetchUnpublishedSubjects());
    } catch {}
  };

  const handlePublish = async () => {
    try {
      if (subjectName === "album") {
        await dispatch(publishAlbum(item._id)).unwrap();
      } else if (subjectName === "track") {
        await dispatch(publishTracks(item._id)).unwrap();
      } else {
        await dispatch(publishArtist(item._id)).unwrap();
      }

      await dispatch(fetchUnpublishedSubjects());
    } catch {}
  };

  return (
    <TableRow key={item._id}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{subjectName.toUpperCase()}</TableCell>
      <TableCell>
        <LoadingButton
          onClick={handleDelete}
          startIcon={<DeleteForeverIcon />}
          loading={deleteLoading === item._id}
          disabled={!!deleteLoading}
          color="error"
          variant="contained"
          size="small"
        >
          Delete
        </LoadingButton>
      </TableCell>
      <TableCell>
        <LoadingButton
          onClick={handlePublish}
          endIcon={<PublishIcon />}
          loading={deleteLoading === item._id}
          disabled={!!deleteLoading}
          color={item.isPublished ? "warning" : "success"}
          sx={{ color: "#fff", ml: "10px" }}
          variant="contained"
          size="small"
        >
          {item.isPublished ? "Cancel" : "Publish"}
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default AdminTableRow;
