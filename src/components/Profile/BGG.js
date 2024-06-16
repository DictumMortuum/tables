import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserContext } from '../../context';
import { updatePlayer } from '../api';

const Update = ({ player, value }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const { setMsg, setOpen } = React.useContext(UserContext);

  const onClick = async () => {
    setIsSearching(true);

    const rs = await updatePlayer(player.id, {
      bgg_username: value,
    }).catch(err => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    });

    const { errors } = rs;
    if (errors === undefined) {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }

    setMsg("Your profile picture was saved successfully.");
    setOpen(true);
    setIsSearching(false);
  };

  return (
    <Button variant="contained" disabled={isSearching} onClick={onClick}>Save</Button>
  );
}

const Fetch = () => {
  return (
    <Button variant="contained" color="secondary">Fetch Wishlist</Button>
  );
}

const Component = ({ email, player }) => {
  const [value, setValue] = React.useState(player.bgg_username);

  const handleChange = event => {
    setValue(event.target.value);
  }

  return (
    <Card>
      <CardHeader title="Set Boardgamegeek Username" />
      <CardContent>
        <TextField label="Bgg username" variant="outlined" value={value} onChange={handleChange} fullWidth />
      </CardContent>
      <CardActions>
        <Update email={email} value={value} player={player} />
        <Fetch />
      </CardActions>
    </Card>
  );
}

export default Component;
