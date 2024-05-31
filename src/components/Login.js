import React from 'react';
import Login, { authProvider} from 'servus-react-login';

const notify = props => {
  console.log(props);
}

const Component = () => {
  const { checkAuth, login, signup, resetPassword } = authProvider;

  return (
    <Login
      checkAuth={checkAuth}
      login={login}
      signup={signup}
      notify={notify}
      resetPassword={resetPassword}
    />
  )
}

export default Component;
