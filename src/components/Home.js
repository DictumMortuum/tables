import React from 'react';
import { Grid, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { Join } from './Join';
import { useFetch } from '../hooks/useFetch';
import useMediaQuery from '@mui/material/useMediaQuery';

const dateFilter = show => ({ date }) => {
  const d = new Date(date);
  const now = new Date();

  return d > now || show;
}

const sortFn = (a, b) => {
  const ad = new Date(a.date)
  const bd = new Date(b.date)

  return bd - ad
}

const HomeContent = () => {
  const [showAll, setShowAll] = React.useState(false);
  const { data, loading } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables`, []);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  React.useEffect(() => {
    if (data.filter(dateFilter(false)).length === 0) {
      setShowAll(true);
    }
  }, [data])

  if (loading) {
    return <>Loading...</>
  }

  if (data === undefined) {
    return <></>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showAll}
                onChange={(event) => setShowAll(event.target.checked)}
              />
            }
            label="Show Archived"
          />
        </Box>
      </Grid>
      {data !== undefined && data.filter(dateFilter(showAll)).sort(sortFn).map((d, i) => (
        <Grid key={i} item xs={12}>
          <Join data={d} />
        </Grid>
      ))}
      { matches && <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button component={Link} variant="contained" color="secondary" to="/create">Create</Button>
        </Box>
      </Grid>}
    </Grid>
  );
}

export default HomeContent;
