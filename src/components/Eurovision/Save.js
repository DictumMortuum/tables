import React from 'react';
import { Box, Button } from '@mui/material';
import { createEurovisionVotes } from '../api';
import { useEmail } from '../../hooks/useEmail';
import { UserContext } from '../../context';

const Component = ({ items }) => {
  const { user_id, email, loading } = useEmail();
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
      <Button variant="contained" onClick={handleClick} disabled={loading} sx={{ marginRight: 2 }}>Save</Button>
    </Box>
  );
}

export default Component;
