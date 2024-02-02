import './App.css';
import React from 'react';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";
import { HashRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Container, Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Create from './components/Create';
import Home from './components/Home';
import Join from './components/Join';
import { UserProvider } from './context';
import 'dayjs/locale/en-gb';

SuperTokens.init({
  appInfo: {
    appName: "auth",
    apiDomain: "https://auth.dictummortuum.com",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdPartyEmailPassword.init(),
    Session.init()
  ]
});

const Layout = () => {
  return (
    <Container>
      <Stack direction="row" spacing={2} mt={1}>
        <Button component={Link} to="/">Home</Button>
        <Button component={Link} to="/create">Create</Button>
      </Stack>
      <Outlet />
    </Container>
  );
}

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <SuperTokensWrapper>
        <UserProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI])}
                <Route path="/create" element={
                  <SessionAuth requireAuth={true}>
                    <Create />
                  </SessionAuth>
                } />
                <Route path="/show/:id" element={<Join />} />
              </Route>
            </Routes>
          </HashRouter>
        </UserProvider>
      </SuperTokensWrapper>
    </LocalizationProvider>
  );
}

export default App;
