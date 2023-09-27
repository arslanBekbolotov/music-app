import { Box, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import FileInput from "../../components/FileInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createArtist } from "./artistsThunk";
import { IArtistFormMutation } from "../../types";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createArtistLoading, artistValidationError } = useAppSelector(
    (state) => state.artistsStore,
  );
  const [state, setState] = useState<IArtistFormMutation>({
    name: "",
    image: null,
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
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
      await dispatch(createArtist(state)).unwrap();
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
              autoComplete="set name of artist"
              name="name"
              required
              fullWidth
              value={state.name}
              label="Name"
              onChange={onChangeInput}
              error={Boolean(artistValidationError?.errors.name.message)}
              helperText={artistValidationError?.errors.name.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ pt: "16px" }}>
            <FileInput
              onChange={filesInputChangeHandler}
              name="image"
              label="image"
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <LoadingButton
              loading={createArtistLoading}
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

export default NewArtist;
