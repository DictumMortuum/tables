import React from 'react';
import { Grid } from '@mui/material';
import { useEmail } from '../../hooks/useEmail';
import Picture from './Picture';
import BGG from './BGG';
import { useQuery } from '@tanstack/react-query';

const fetchPlayer = async ({ email }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/players/email/${email}`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });
  return rs.json();
}

const Container = () => {
  const { email } = useEmail();

  const { data, isLoading }= useQuery({
    queryKey: ["player", email],
    queryFn: () => fetchPlayer({ email }),
    enabled: !!email,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <Component player={data} />
}

const Component = ({ player }) => {
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

export default Container;
