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
import { authProvider, SessionAuth, Reset } from 'servus-react-login';
import { UserProvider } from './context';
import 'dayjs/locale/en-gb';
import { useEmail } from './hooks/useEmail';
import Footer from './components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Layout = () => {
  const { email } = useEmail();

  const onLogout = async () => {
    await authProvider.logout();
    window.location.href = "/";
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <Container sx={{ marginBottom: 2 }}>
        <Stack direction="row" spacing={2} mt={1}>
          <Button component={Link} to="/">Tables</Button>
          {email !== null &&
            <div style={{ marginLeft: "auto" }}>
              {email} <Button onClick={onLogout}>Logout</Button>
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
