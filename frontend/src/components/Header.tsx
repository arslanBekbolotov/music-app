import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1, mb:"20px" }} >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tracks
                    </Typography>
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;