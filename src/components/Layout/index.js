import React from 'react';
import { authProvider } from 'servus-react-login';
import useMediaQuery from '@mui/material/useMediaQuery';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { UserContext } from '../../context';
import { useQuery } from '@tanstack/react-query';

const fetchConfiguration = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/configurations`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });
  return rs.json();
}

const Component = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [state, setState] = React.useState(false);
  const { state: { user: { email } }, dispatch } = React.useContext(UserContext);

  const { data, isLoading } = useQuery({
    queryKey: ["configurations"],
    queryFn: fetchConfiguration,
  });

  React.useEffect(() => {
    if (!isLoading) {
      dispatch({
        type: "configuration::set",
        data,
      });
    }
  }, [data, isLoading, dispatch])

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
      <Mobile email={email} onLogout={onLogout} state={state} setState={setState} />
    )
  }

  return (
    <Desktop email={email} splitted={splitted} onLogout={onLogout} state={state} setState={setState} />
  );
}

export default Component;
