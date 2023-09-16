import React from "react";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/users/usersSlice";
import { useAppSelector } from "../../app/hooks";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Header = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box sx={{ flexGrow: 1, mb: "20px" }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{ flexGrow: 1, color: "#fff", textDecoration: "none" }}
          >
            <Typography variant="h5" component="div">
              Tracks
            </Typography>
          </Link>
          <Grid item>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
