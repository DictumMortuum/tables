import React from 'react';
import Create from './Create';
import List from './List';
import Save from './Save';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEmail } from '../../hooks/useEmail';
import Loading from '../Loading';

const fetchEurovisionParticipations = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
}

const fetchEurovisionVotes = async ({ user_id }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/user/${user_id}`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });
  return rs.json();
}

const Container = () => {
  const { user_id } = useEmail();

  const participations = useQuery({
    queryKey: ["participations"],
    queryFn: fetchEurovisionParticipations,
  });

  const votes = useQuery({
    queryKey: ["votes", user_id],
    queryFn: () => fetchEurovisionVotes({ user_id }),
    enabled: !!user_id,
    initialData: { votes: [] },
  });

  if (votes.isLoading || participations.isLoading) {
    return <Loading />;
  }

  if (votes.data !== null) {
    const temp = votes.data.votes.map(d => d.id);
    const newvotes = [
      ...votes.data.votes,
      ...participations.data.filter(d => !temp.includes(d.id)),
    ];

    return <Eurovision user_id={user_id} votes={newvotes} />
  } else {
    return <Eurovision user_id={user_id} votes={participations.data} />
  }
}

const Eurovision = ({ votes, user_id }) => {
  const [list, setList] = React.useState(votes);

  React.useEffect(() => {
    setList(votes);
  }, [votes]);

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Create exists={!!user_id} />
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

export default Container;
