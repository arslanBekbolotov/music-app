import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Header = () => {
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
          <IconButton size="large" color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
