import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Container, Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Create from './components/Create';
import Home from './components/Home';
import Join from './components/Join';
import Login from './components/Login';
import Eurovision from './components/Eurovision';
import { authProvider, SessionAuth, Reset } from 'servus-react-login';
import { UserProvider } from './context';
import 'dayjs/locale/en-gb';
import { useEmail } from './hooks/useEmail';
import Footer from './components/Footer';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useMediaQuery from '@mui/material/useMediaQuery';
import TableBarIcon from '@mui/icons-material/TableBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';

const StyledFab = styled(Fab)({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 80,
  left: 'auto',
  position: 'fixed',
});

const Layout = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  const { email } = useEmail();
  const { pathname } = useLocation();

  let splitted;
  if (email !== null) {
    splitted = email.split("@")[0];
  }

  const onLogout = async () => {
    await authProvider.logout();
    window.location.href = "/";
  }

  if (!matches) {
    return (
      <Stack direction="column" sx={{ height: "100%" }}>
        <Outlet />
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          {pathname === "/" && <StyledFab color="secondary" aria-label="add" component={Link} to="/create">
            <AddIcon  sx={{ color: "white"}} />
          </StyledFab>}
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction component={Link} to="/" label="Tables" icon={<TableBarIcon />} />
            <BottomNavigationAction component={Link} to="/eurovision" label="Eurovision" icon={<EmojiEventsIcon />} />
            <BottomNavigationAction label={splitted} icon={<LogoutIcon />} onClick={onLogout} />
          </BottomNavigation>
        </AppBar>
      </Stack>
    )
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <Container sx={{ marginBottom: 2 }}>
        <Stack direction="row" spacing={2} mt={1}>
          <Button component={Link} to="/">Tables</Button>
          <Button component={Link} to="/eurovision">Eurovision</Button>
          {email !== null &&
            <div style={{ marginLeft: "auto" }}>
              {splitted} <Button onClick={onLogout}>Logout</Button>
            </div>
          }
        </Stack>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e3440',
    },
    secondary: {
      main: '#bf616a',
    },
    error: {
      main: '#d08770',
    },
    warning: {
      main: '#ebcb8b',
    },
    success: {
      main: '#a3be8c',
    },
    background: {
      default: '#eceff4',
    },
  },
});

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeProvider theme={theme}>
        <UserProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/auth/reset-password" element={<Reset />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/eurovision" element={<Eurovision />} />
                <Route path="/create" element={
                  <SessionAuth>
                    <Create />
                  </SessionAuth>
                } />
                <Route path="/show/:id" element={<Join />} />
              </Route>
            </Routes>
          </HashRouter>
        </UserProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
