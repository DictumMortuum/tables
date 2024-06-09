import React from 'react';
import Create from './Create';
import { useEmail } from '../../hooks/useEmail';
import { useFetch } from '../../hooks/useFetch';
import List from './List';
import { Grid } from '@mui/material';

const Eurovision = () => {
  const { user_id, email } = useEmail();
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, undefined)

  if (loading) {
    return <>Loading...</>
  }

  if (data === undefined) {
    return <></>
  }

  const rs = data.filter(d => d.user_id === user_id);

  let d = {};
  let exists = false;
  if (rs.length > 0) {
    d = rs[0].boardgame;
    exists = true;
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Create user_id={user_id} email={email} data={d} exists={exists} />
      </Grid>
      <Grid item xs={12}>
        <List items={data} user_id={user_id} email={email} />
      </Grid>
    </Grid>
  );
}

export default Eurovision;
export {
  Create
}
