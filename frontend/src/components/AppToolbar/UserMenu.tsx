import React, { useState } from 'react';
import { Button, CardMedia, Grid, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';
import { unsetUser } from '../../features/users/usersSlice';
import { Link as NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(unsetUser());
      navigate('/');
    } catch {
      //nothing
    }
  };

  const avatar = user.avatar ? 'http://localhost:8001/' + user.avatar : '';

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        <Grid container item alignItems="center">
          Hello, {user.displayName}
          {user.avatar && (
            <CardMedia
              sx={{
                height: '35px',
                width: '35px',
                backgroundSize: 'contain',
                ml: '5px',
              }}
              image={avatar}
              title={user.displayName}
            />
          )}
        </Grid>
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => navigate('/track_history')}>Track History</MenuItem>
        {user.role === 'admin' && (
          <MenuItem>
            <Link to="/unpublished">Unpublished</Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link to="/new_album">Add New Album</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/new_artist">Add New Artist</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/new_track">Add New Track</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
