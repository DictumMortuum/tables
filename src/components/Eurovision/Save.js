import React from 'react';
import { Box, Button } from '@mui/material';
import { createEurovisionVotes } from '../api';
import { UserContext } from '../../context';

const Component = ({ items, user_id, email }) => {
  const { setMsg, setOpen } = React.useContext(UserContext);

  const handleClick = async () => {
    createEurovisionVotes({
      user_id,
      email,
      votes: items
    }).then(() => {
      setMsg("Votes saved successfully.");
      setOpen(true);
    }).catch(err => {
      setMsg("There was an error saving your votes.");
      setOpen(true);
    });
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={handleClick}>Save</Button>
    </Box>
  );
}

export default Component;
