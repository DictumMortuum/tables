import React from 'react';
import { Box, Button } from '@mui/material';
import { createEurovisionVotes } from '../api';
import { useEmail } from '../../hooks/useEmail';
import { UserContext } from '../../context';
import { useMutation } from '@tanstack/react-query';

const Component = ({ items }) => {
  const { user_id, email } = useEmail();
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, status, mutate } = useMutation({
    mutationFn: createEurovisionVotes
  });

  React.useEffect(() => {
    if (status === "error") {
      setMsg("There was an error saving your votes.");
      setOpen(true);
    }

    if (status === "success") {
      setMsg("Votes saved successfully.");
      setOpen(true);
    }
  }, [status, setMsg, setOpen]);

  const handleClick = async () => {
    mutate({
      user_id,
      email,
      votes: items
    });
  }

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={handleClick} disabled={isPending} sx={{ marginRight: 2 }}>Save</Button>
    </Box>
  );
}

export default Component;
