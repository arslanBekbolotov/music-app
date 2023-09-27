import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { IAlbumFormMutation } from "../../types";
import SendIcon from "@mui/icons-material/Send";
import FileInput from "../../components/FileInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAlbum } from "./albumsThunk";
import { useNavigate } from "react-router-dom";
import { fetchArtists } from "../artists/artistsThunk";
import { selectArtists } from "../artists/artistsSlice";
import { selectAlbumCreateLoading } from "./albumsSlice";

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);
  const createLoading = useAppSelector(selectAlbumCreateLoading);
  const [state, setState] = useState<IAlbumFormMutation>({
    name: "",
    release: "",
    artist: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangeSelect = (e: SelectChangeEvent) => {
    setState((prevState) => ({ ...prevState, artist: e.target.value }));
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const files = e.target.files;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createAlbum(state)).unwrap();
      navigate("/");
    } catch {
      //nothing
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="set name of album"
              name="name"
              required
              fullWidth
              value={state.name}
              label="Name"
              onChange={onChangeInput}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              type="number"
              label="Release"
              name="release"
              value={state.release}
              onChange={onChangeInput}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "16px" }}>
            <FileInput
              onChange={filesInputChangeHandler}
              name="image"
              label="image"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="album_select">Artists</InputLabel>
              <Select
                required
                labelId="album_select"
                value={state.artist}
                label="Artists"
                onChange={onChangeSelect}
              >
                {artists.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <LoadingButton
              loading={createLoading}
              type="submit"
              endIcon={<SendIcon />}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, maxWidth: "25%" }}
            >
              Send
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewAlbum;
