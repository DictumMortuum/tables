import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Container, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Create from './components/Create';
import Home from './components/Home';
import Join from './components/Join';
import Login from './components/Login';
import Eurovision from './components/Eurovision';
import Profile from './components/Profile';
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
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import Drawer from './components/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Snackbar from './components/Snackbar';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
  const [state, setState] = React.useState(false);
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
        <Drawer state={state} setState={setState} />
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          {pathname === "/" && <StyledFab color="secondary" aria-label="add" component={Link} to="/create">
            <AddIcon sx={{ color: "white"}} />
          </StyledFab>}
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
    )
  }

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
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
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
                <Route path="/profile" element={<Profile />} />
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
    </QueryClientProvider>
  );
}

export default App;
