import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { UserContext } from '../../context';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

export const createFinderUser = (payload) => fetch(`${process.env.REACT_APP_ENDPOINT}/rest/finderusers`, {
  method: "POST",
  body: JSON.stringify(payload),
}).then(res => res.json());

export const getFinderWishlist = user_id => fetch(`${process.env.REACT_APP_PLAYER_ENDPOINT}/player/finderuser/${user_id}`, {
  method: "GET"
}).then(res => res.json());

const Update = ({ value }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: createFinderUser,
    onSuccess: (data, variables, context) => {
      setMsg("The bgg username was saved successfully.");
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['finder'] });
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  console.log(value)

  const handleClick = async () => {
    mutate({
      bgg_username: value,
      collection: {},
    });
  }

  return (
    <Button variant="contained" disabled={isPending} onClick={handleClick}>Save</Button>
  );
}

const Fetch = ({ value }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, mutate } = useMutation({
    mutationFn: getFinderWishlist,
    onSuccess: (data, variables, context) => {
      if (data.data.length === 0) {
        setMsg("Something went wrong, please try again.");
        setOpen(true);
      } else {
        setMsg("Synced collection successfully.");
        setOpen(true);
      }
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

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

const Component = ({ open, setOpen }) => {
  const [value, setValue] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Card sx={style}>
        <CardHeader title="Set Boardgamegeek Username" />
        <CardContent>
          <TextField label="Bgg username" variant="outlined" value={value} onChange={handleChange} fullWidth />
        </CardContent>
        <CardActions>
          <Update value={value} />
          <Fetch value={value} />
        </CardActions>
      </Card>
    </Modal>
  );
}

export default Component;
