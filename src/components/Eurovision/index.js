import React from 'react';
import Create from './Create';
import { useFetch } from '../../hooks/useFetch';
import List from './List';
import Save from './Save';
import { Grid } from '@mui/material';
import { useEmail } from '../../hooks/useEmail';

const User = () => {
  const { loading, user_id } = useEmail();

  if (loading) {
    return <>Loading...</>;
  }

  if (user_id === null) {
    return <EurovisionContainer />
  }

  return <EurovisionUserContainer user_id={user_id} />
}

const EurovisionContainer = () => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, undefined)

  if (loading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  return <Eurovision data={data} />
}

const EurovisionUserContainer = ({ user_id }) => {
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/user/${user_id}`, undefined)

  if (loading) {
    return <>Loading...</>;
  }

  if (data === undefined) {
    return <></>;
  }

  return <Eurovision data={data.votes} />
}

const Eurovision = ({ data }) => {
  const [list, setList] = React.useState(data);

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Create />
      </Grid>
      <Grid item xs={12}>
        <Save items={list} />
      </Grid>
      <Grid item xs={12}>
        <List list={list} setList={setList} />
      </Grid>
    </Grid>
  );
}

export default User;
export {
  Create
}
