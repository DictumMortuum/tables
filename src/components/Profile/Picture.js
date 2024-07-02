import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserContext } from '../../context';
import { updatePlayer } from '../api';
import { useMutation } from '@tanstack/react-query';

const Update = ({ player, avatar }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, mutate } = useMutation({
    mutationFn: updatePlayer,
    onSuccess: (data, variables, context) => {
      setMsg("Your profile picture was saved successfully.");
      setOpen(true);
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  const handleClick = async () => {
    mutate({
      id: player.id,
      avatar,
    });
  }

  return (
    <Button variant="contained" disabled={isPending} onClick={handleClick}>Save</Button>
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
