import React from "react";
import { IAlbum } from "../../../types";
import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import notFoundImage from "../../../assets/notFound.png";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteAlbum, fetchAlbumsByQuery, publishAlbum } from "../albumsThunk";
import { selectUser } from "../../users/usersSlice";
import { selectAlbumDeleteLoading } from "../albumsSlice";
import PublishIcon from "@mui/icons-material/Publish";

interface Props {
  album: IAlbum;
}

const AlbumsItem: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectAlbumDeleteLoading);
  const dispatch = useAppDispatch();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(deleteAlbum(album._id)).unwrap();
      navigate("/");
    } catch {}
  };

  const handlePublish = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await dispatch(publishAlbum(album._id)).unwrap();
      await dispatch(fetchAlbumsByQuery(id));
    } catch {}
  };

  if (
    album.isPublished ||
    (!album.isPublished && (user?.role === "admin" || user?._id === album.user))
  ) {
    return (
      <Paper
        key={album._id}
        elevation={3}
        sx={{
          p: "15px",
          position: "relative",
          textAlign: "center",
          ":hover": { filter: "brightness(90%)" },
        }}
        onClick={() => navigate("/tracks/" + album._id)}
      >
        <CardMedia
          sx={{ height: 170, backgroundSize: "contain", mb: "15px" }}
          image={
            album.image ? "http://localhost:8001/" + album.image : notFoundImage
          }
          title={album.name}
        />
        <span
          style={{
            position: "absolute",
            top: "-5px",
            left: "-5px",
            padding: "4px 12px",
            color: "#000",
            borderRadius: "50%",
            backgroundColor: "#ccc",
          }}
        >
          {album.count}
        </span>
        <Box>
          <Typography>{album.name}</Typography>
          <Typography sx={{ color: "#ccc", fontSize: "14px" }}>
            {album.release}
          </Typography>
        </Box>
        {(user?.role === "admin" ||
          (user?._id === album.user && !album.isPublished)) && (
          <span
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#121212",
              padding: "5px 10px",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            {album.isPublished ? "Published" : "Unpublished"}
          </span>
        )}
        <Grid item container justifyContent="center">
          {user && (user.role === "admin" || user._id === album.user) && (
            <LoadingButton
              onClick={handleDelete}
              startIcon={<DeleteForeverIcon />}
              loading={deleteLoading === album._id}
              disabled={!!deleteLoading.length}
              color="error"
              variant="contained"
              size="small"
            >
              Delete
            </LoadingButton>
          )}
          {user?.role === "admin" && (
            <LoadingButton
              onClick={handlePublish}
              endIcon={<PublishIcon />}
              loading={deleteLoading === album._id}
              disabled={!!deleteLoading.length}
              color={album.isPublished ? "warning" : "success"}
              sx={{ color: "#fff", ml: "10px" }}
              variant="contained"
              size="small"
            >
              {album.isPublished ? "Cancel" : "Publish"}
            </LoadingButton>
          )}
        </Grid>
      </Paper>
    );
  }

  return null;
};

export default AlbumsItem;
