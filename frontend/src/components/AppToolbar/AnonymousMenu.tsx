import React, {useState} from 'react';
import {Menu, MenuItem} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import {Link as NavLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AnonymousMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <AccountCircleIcon fontSize="large" />
      </IconButton>
      <Menu
        sx={{left: '0'}}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to="/register" color="inherit">
            Register
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login" color="inherit">
            Login
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AnonymousMenu;
