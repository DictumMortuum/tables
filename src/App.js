import './App.css';
import React from 'react';
import 'dayjs/locale/en-gb';
import { HashRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Create from './components/Tables/Create';
import Home from './components/Tables/Home';
import Join from './components/Tables/Join';
import Login from './components/Layout/Login';
import Eurovision from './components/Eurovision';
import Finder from './components/Finder';
import Analyzer from './components/Analyzer';
import Profile from './components/Profile';
import { Reset } from 'servus-react-login';
import { UserProvider } from './context';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout';
import { theme } from './theme';
import TestEurovision from './components/Eurovision/Test';

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient());

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
                  <Route path="/create" element={<Create />} />
                  <Route path="/show/:id" element={<Join />} />
                  <Route path="/finder" element={<Finder />} />
                  <Route path="/analyzer" element={<Analyzer />} />
                  <Route path="/eurovision/score" element={<TestEurovision />} />
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
