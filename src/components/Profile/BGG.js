import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserContext } from '../../context';
import { updatePlayer, getPlayerWishlist } from '../api';
import { useMutation } from '@tanstack/react-query';

const Update = ({ player, value }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, status, mutate } = useMutation({
    mutationFn: updatePlayer
  });

  React.useEffect(() => {
    if (status === "error") {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }

    if (status === "success") {
      setMsg("Your bgg username was saved successfully.");
      setOpen(true);
    }
  }, [status, setMsg, setOpen]);

  const handleClick = async () => {
    mutate({
      id: player.id,
      bgg_username: value,
    });
  }

  return (
    <Button variant="contained" disabled={isPending} onClick={handleClick}>Save</Button>
  );
}

const Fetch = ({ value }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, status, mutate } = useMutation({
    mutationFn: getPlayerWishlist
  });

  React.useEffect(() => {
    if (status === "error") {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }

    if (status === "success") {
      setMsg("Synced collection successfully.");
      setOpen(true);
    }
  }, [status, setMsg, setOpen]);

  const handleClick = async () => {
    if (value === "") {
      setMsg("Please set a username first.");
      setOpen(true);
      return
    }

    mutate(value);
  }

  return (
    <Button variant="contained" color="secondary" disabled={isPending} onClick={handleClick}>Sync Collection</Button>
  );
}

const Component = ({ email, player }) => {
  const [value, setValue] = React.useState(player.bgg_username);

  const handleChange = event => {
    setValue(event.target.value);
  }

  return (
    <Card>
      <CardHeader title="Set Boardgamegeek Username" subheader={`Current collection size: ${player.collection.length}`} />
      <CardContent>
        <TextField label="Bgg username" variant="outlined" value={value} onChange={handleChange} fullWidth />
      </CardContent>
      <CardActions>
        <Update email={email} value={value} player={player} />
        <Fetch value={value} />
      </CardActions>
    </Card>
  );
}

export default Component;
