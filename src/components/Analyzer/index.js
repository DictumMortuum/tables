import React from 'react';
import { Grid, TextField, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { UserContext } from '../../context';
import FetchCollection from './FetchCollection';
import AutoSizer from 'react-virtualized-auto-sizer';
import CollectionGraph from './CollectionGraph';
import YearGraph from './YearGraph';
import PlayersGraph from './PlayersGraph';
import RatingGraph from './RatingGraph';
import PlayingTimeGraph from './PlayingTimeGraph';
import ExpansionGraph from './ExpansionGraph';
import WeightGraph from './WeightGraph';
import BestGamesList from './BestGamesList';

const Component = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const [filterExpansions, setFilterExpansions] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  const handleUser = (event) => {
    dispatch({ type: "bgg_user::set", bgg_user: event.target.value });
  }

  const handleShowAll = (event) => {
    setShowAll(event.target.checked);
  }

  const handleFilterExpansions = (event) => {
    setFilterExpansions(event.target.checked);
  }

  const sx = { minHeight: 500, minWidth: "100%" };

  return (
    <Grid container spacing={2} mt={1} p={2} pb={5}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Collection</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="BoardGameGeek Username"
          value={state.bgg_user}
          fullWidth
          onChange={handleUser}
        />
      </Grid>
      <Grid item xs={12}>
        <FetchCollection />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel control={<Switch checked={showAll} onChange={handleShowAll} />} label="Show all games in the top games lists (the default limit is 10 games)." />
          <FormControlLabel control={<Switch checked={filterExpansions} onChange={handleFilterExpansions} />} label="Filter out expansions in the top games lists." />
        </FormGroup>
      </Grid>
      {state.collection.length > 0 && <>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Breakdown by status</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <CollectionGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned games by year</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <YearGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned games by max players</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <PlayersGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned games by average rating</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <RatingGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned games by playing time</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <PlayingTimeGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned games by weight</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <WeightGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Owned base games/expansions</Typography>
        </Grid>
        <Grid item xs={12} sx={sx}>
          <AutoSizer>
            {({ height, width }) => (
              <ExpansionGraph data={state.collection} width={width} height={height} />
            )}
          </AutoSizer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for solo</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={1} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for 2 players</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={2} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for 3 players</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={3} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for 4 players</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={4} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for 5 players</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={5} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Best owned games for 6 players</Typography>
        </Grid>
        <Grid item xs={12}>
          <BestGamesList data={state.collection} num={6} showAll={showAll} filterExpansions={filterExpansions} />
        </Grid>
      </>}
    </Grid>
  );
}

export default Component;
