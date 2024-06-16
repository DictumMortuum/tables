import React from 'react';
import { Grid } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { useEmail } from '../../hooks/useEmail';
import Picture from './Picture';
import BGG from './BGG';

const User = () => {
  const { loading, user_id, email } = useEmail();

  if (loading) {
    return <>Loading...</>;
  }

  return <UserContainer user_id={user_id} email={email} />
}

const UserContainer = ({ user_id, email }) => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/players/email/${email}`, undefined)

  if (loading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  const { errors } = data;

  if (errors !== undefined) {
    return <></>
  }

  return <Component user_id={user_id} email={email} player={data} />
}

const Component = ({ user_id, email, player }) => {
  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Picture player={player} />
      </Grid>
      <Grid item xs={12}>
        <BGG player={player} />
      </Grid>
    </Grid>
  );
}

export default User;
