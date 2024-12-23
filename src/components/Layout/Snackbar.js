import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { UserContext } from '../../context';

const Component = () => {
  const { open, msg, setOpen } = React.useContext(UserContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={msg}
    />
  );
}

export default Component;
