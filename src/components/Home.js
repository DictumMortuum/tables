import React from 'react';
import { Grid } from '@mui/material';
// import { useFetch } from '@uidotdev/usehooks';
import { Join } from './Join';
import { useEmail } from '../hooks/useEmail';
import { useFetch } from '../hooks/useFetch';

const HomeContent = () => {
  const { data, loading } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables`, []);
  const { user_id, email } = useEmail();

  if (loading) {
    return <>Loading...</>
  }

  if (data === undefined || user_id === null || email === null) {
    return <></>
  }

  return <Home data={data} user_id={user_id} email={email} />
}

const Home = ({ data, user_id, email }) => {
  return (
    <Grid container spacing={2}>
      {data !== undefined && data.map((d, i) => (
        <Grid key={i} item xs={12}>
          <Join data={d} user_id={user_id} email={email} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HomeContent;
