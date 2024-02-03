import React from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import Table from './Table';
import { useParams } from 'react-router-dom';
import { createParticipant, removeParticipant } from './api';
import { useEmail } from '../hooks/useEmail';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFetch } from '../hooks/useFetch';

const LeaveButton = ({ participation, setJoined, setParticipations, setError }) => {
  const [isSearching, setIsSearching] = React.useState(false);

  const onClick = async () => {
    setIsSearching(true);
    const rs = await removeParticipant(participation.id);

    setIsSearching(false);
    if (rs?.errors) {
      setError(rs.errors.error);
      return
    }

    setParticipations([]);
    setJoined(false);
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      color="error"
      fullWidth
    >
      Leave
    </Button>
  );
}

const JoinButton = ({ id, user_id, email, setJoined, setParticipations, setError }) => {
  const [isSearching, setIsSearching] = React.useState(false);

  const onClick = async () => {
    if (!user_id  || !email) {
      setError("Please log in");
      return
    }

    setIsSearching(true);

    const rs = await createParticipant({
      table_id: id,
      user_id: user_id,
      name: email,
    });

    setIsSearching(false);
    if (rs?.errors) {
      setError(rs.errors.error);
      return
    }

    setJoined(true);
    setParticipations([rs]);
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      fullWidth
    >
      Join
    </Button>
  );
}

const JoinContent = () => {
  const { id } = useParams();
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables/${id}`, undefined)
  const { user_id, email } = useEmail();

  if (loading === true) {
    return <></>
  }

  if (data === undefined || user_id === null || email === null) {
    return <></>
  }

  return <Join data={data} id={id} user_id={user_id} email={email} />
}

const Join = props => {
  const { data, user_id, email } = props;
  const [joined, setJoined] = React.useState(data.participants.map(d => d.user_id).includes(user_id));
  const [participations, setParticipations] = React.useState(data.participants.filter(d => d.user_id === user_id));
  const [error, setError] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box>
      {joined && <Table
        {...data}
        // participants={data.participants}
        button={
          <LeaveButton
            participation={participations[0]}
            setJoined={setJoined}
            setParticipations={setParticipations}
            setError={setError}
          />
        }
      />}
      {!joined && <Table
        {...data}
        // participants={participations}
        button={
          <JoinButton
            user_id={user_id}
            email={email}
            setJoined={setJoined}
            setParticipations={setParticipations}
            setError={setError}
            {...data}
          />
        }
      />}
      <Snackbar
        open={error !== null}
        autoHideDuration={2000}
        onClose={handleClose}
        message={error}
        action={action}
      />
    </Box>
  );
}

export default JoinContent;
export {
  Join
};
