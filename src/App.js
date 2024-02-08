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
    apiDomain: process.env.REACT_APP_AUTH_ENDPOINT,
    websiteDomain: process.env.REACT_APP_WEBSITE,
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          const redirect = localStorage.getItem("redirectURL");

          if (redirect !== undefined) {
            localStorage.clear();
            return redirect
          }
        }
        return undefined;
    }
    }),
    Session.init()
  ]
});

const Layout = () => {
  // const onLogout = async () => {
  //   await signOut();
  //   window.location.href = "/";
  // }

  return (
    <Container>
      <Stack direction="row" spacing={2} mt={1}>
        <Button component={Link} to="/">Home</Button>
        <Button component={Link} to="/create">Create</Button>
        {/* <SessionAuth>
          <Button onClick={onLogout}>Logout</Button>
        </SessionAuth> */}
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
                <Route index element={
                  <SessionAuth>
                    <Home />
                  </SessionAuth>
                } />
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyEmailPasswordPreBuiltUI])}
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
      </SuperTokensWrapper>
    </LocalizationProvider>
  );
}

export default App;
