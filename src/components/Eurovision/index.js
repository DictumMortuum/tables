import React from 'react';
import Create from './Create';
import { useEmail } from '../../hooks/useEmail';
import { useFetch } from '../../hooks/useFetch';
import List from './List';
import Save from './Save';
import { Grid } from '@mui/material';

const EurovisionCheckAuth = () => {
  const { user_id, email } = useEmail();

  return <EurovisionUserContainer email={email} user_id={user_id} />
}

const EurovisionUserContainer = ({ user_id, email }) => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/user/${user_id}`, undefined)

  if (loading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  const { errors } = data;

  if (errors !== undefined) {
    return <EurovisionContainer />
  }

  return <Eurovision email={email} user_id={user_id} data={data.votes} />
}

const EurovisionContainer = ({ user_id, email }) => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, undefined)

  if (loading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  return <Eurovision email={email} user_id={user_id} data={data} />
}

const Eurovision = ({ user_id, email, data }) => {
  const [list, setList] = React.useState(data);
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
        <Save items={list} user_id={user_id} email={email} />
      </Grid>
      <Grid item xs={12}>
        <List list={list} setList={setList} />
      </Grid>
    </Grid>
  );
}

export default EurovisionCheckAuth;
export {
  Create
}
