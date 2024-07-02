import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Container, Stack } from '@mui/material';
import Footer from '../Footer';
import TableBarIcon from '@mui/icons-material/TableBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '../Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '../Snackbar';
import Box from '@mui/material/Box';

const Component = ({ email, splitted, onLogout, state, setState }) => {
  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <Container sx={{ marginBottom: 2 }}>
        <Stack direction="row" spacing={2} mt={1}>
          <IconButton onClick={() => { setState(true) }}>
            <MenuIcon />
          </IconButton>
          <IconButton component={Link} to="/">
            <TableBarIcon />
          </IconButton>
          <IconButton component={Link} to="/eurovision">
            <EmojiEventsIcon />
          </IconButton>
          <IconButton component={Link} to="/finder">
            <SearchIcon />
          </IconButton>
          {email !== null &&
            <div style={{ marginLeft: "auto" }}>
              <Box component={Link} to="/profile">{splitted}</Box>
              <IconButton onClick={onLogout}>
                <LogoutIcon />
              </IconButton>
            </div>
          }
          {email === null &&
            <div style={{ marginLeft: "auto" }}>
              <IconButton component={Link} to="/auth/login">
                <LoginIcon />
              </IconButton>
            </div>
          }
        </Stack>
        <Drawer state={state} setState={setState} />
        <Outlet />
      </Container>
      <Footer />
      <Snackbar />
    </Stack>
  );
}

export default Component;
