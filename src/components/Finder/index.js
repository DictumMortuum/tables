import React from 'react';
import { Grid, Button, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';
import AddParticipant from './AddParticipant';
import CreateParticipant from './CreateParticipant';
import { UserContext } from '../../context';
import Results from './Results';
import List from './List';

const Component = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleInc = () => {
    dispatch({ type: "increment" });
  }

  const handleDec = () => {
    dispatch({ type: "decrement" });
  }

  const handleTime = (event) => {
    dispatch({ type: "time", time: event.target.value });
  }

  const handlePlayers = (event) => {
    dispatch({ type: "players", players: event.target.value });
  }

  const handleCoop = (event) => {
    dispatch({ type: "coop", coop: event.target.checked });
  }

  const handlePriorities = (items) => {
    dispatch({ type: "priority", priority: items });
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Collection</Typography>
          </Grid>
          {[...Array(state.count).keys()].map(d => (
            <Grid item xs={12} key={d}>
              <AddParticipant id={d} dispatch={dispatch} participant={state.participants[d]} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={handleInc}>Add</Button>
            <Button onClick={handleDec}>Remove</Button>
            <Button onClick={() => setOpen(true)}>Create</Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="h5" gutterBottom>Options</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Length (min)"
              type="number"
              value={state.time}
              fullWidth
              onChange={handleTime}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Player Count"
              type="number"
              value={state.players}
              fullWidth
              onChange={handlePlayers}
            />
          </Grid>
          <Grid item xs={6}>
          <FormControlLabel
            label="Cooperative"
            control={
              <Checkbox
                checked={state.coop}
                onChange={handleCoop}
              />
            }
          />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="h5">Priority</Typography>
          </Grid>
          <Grid item xs={12}>
            <List list={state.priority} setList={handlePriorities} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Results data={state.participants} state={state} />
      </Grid>
      <CreateParticipant open={open} setOpen={setOpen} />
    </Grid>
  );
}

export default Component;
