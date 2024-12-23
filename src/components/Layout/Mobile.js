import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from './Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Snackbar from './Snackbar';
import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Component = ({ email, onLogout, state, setState }) => {
  const [value, setValue] = React.useState(0);

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <Outlet />
      <Drawer state={state} setState={setState} />
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="menu" onClick={() => { setState(true) }} icon={<MenuIcon />} />
          <BottomNavigationAction label="profile" component={Link} to="/profile" icon={<AccountCircleIcon />} />
          { email !== null && <BottomNavigationAction label="logout" icon={<LogoutIcon />} onClick={onLogout} />}
          { email === null && <BottomNavigationAction label="login" component={Link} to="/auth/login" icon={<LoginIcon />} />}
        </BottomNavigation>
      </AppBar>
      <Snackbar />
    </Stack>
  );
}

export default Component;
