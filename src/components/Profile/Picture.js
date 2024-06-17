import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserContext } from '../../context';
import { updatePlayer } from '../api';

const Update = ({ player, avatar }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const { setMsg, setOpen } = React.useContext(UserContext);

  const onClick = async () => {
    setIsSearching(true);

    const rs = await updatePlayer(player.id, {
      avatar
    }).catch(err => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    });

    const { errors } = rs;
    if (errors !== undefined) {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    } else {
      setMsg("Your profile picture was saved successfully.");
      setOpen(true);
    }

    setIsSearching(false);
  };

  return (
    <Button variant="contained" disabled={isSearching} onClick={onClick}>Save</Button>
  );
}

const Component = ({ player }) => {
  const [avatar, setAvatar] = React.useState(player.avatar);

  const handleChange = event => {
    setAvatar(event.target.value);
  }

  return (
    <Card>
      <CardHeader title="Set Profile Picture" />
      <CardContent>
        <TextField label="Avatar URL" variant="outlined" value={avatar} onChange={handleChange} fullWidth />
      </CardContent>
      <CardActions>
        <Update avatar={avatar} player={player} />
      </CardActions>
    </Card>
  );
}

export default Component;
