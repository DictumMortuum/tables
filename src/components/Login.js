import { Typography } from '@mui/material';
import React from 'react';
import Login, { authProvider} from 'servus-react-login';

const notify = props => {
  console.log(props);
}

const Component = () => {
  const { checkAuth, login, signup, resetPassword } = authProvider;

  return (
    <>
    <Typography mt={2} sx={{ textAlign: "center"}} component="h5" variant="h5">Login</Typography>
    <Login
      checkAuth={checkAuth}
      login={login}
      signup={signup}
      notify={notify}
      resetPassword={resetPassword}
    />
    </>
  )
}

export default Component;
