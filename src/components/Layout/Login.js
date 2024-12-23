import { Typography } from '@mui/material';
import React from 'react';
import Login, { authProvider } from 'servus-react-login';
import { UserContext } from '../../context';

const Component = () => {
  const { checkAuth, login, signup, resetPassword } = authProvider;
  const { setOpen, setMsg, dispatch } = React.useContext(UserContext);

  const notify = props => {
    setOpen(true);
    setMsg(props);
  }

  const postLogin = () => {
    dispatch({ type: "user::set" });
  }

  return (
    <>
      <Typography mt={2} sx={{ textAlign: "center"}} component="h5" variant="h5">Login</Typography>
      <Login
        checkAuth={checkAuth}
        login={login}
        signup={signup}
        notify={notify}
        resetPassword={resetPassword}
        postLogin={postLogin}
      />
    </>
  )
}

export default Component;
