import React from 'react';
import { Box, Button, Snackbar, Stack } from '@mui/material';
import Table from './Table';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createParticipant, deleteTable, removeParticipant } from './api';
import { useEmail } from '../hooks/useEmail';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFetch } from '../hooks/useFetch';

const LeaveButton = ({ setJoined, participations, setParticipations, setError }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const { user_id } = useEmail();

  const onClick = async () => {
    setIsSearching(true);
    const participation = participations.filter(d => d.user_id === user_id);

    if (participation.length !== 1) {
      setError("You do not participate in this table.");
      return
    }

    const rs = await removeParticipant(participation[0].id);

    setIsSearching(false);
    if (rs?.errors) {
      setError(rs.errors.error);
      return
    }

    setParticipations(participations.filter(d => d.user_id !== user_id));
    setJoined(false);
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      color="secondary"
      fullWidth
    >
      Leave
    </Button>
  );
}

const JoinButton = ({ id, setJoined, participations, setParticipations, setError }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user_id, email } = useEmail();

  const onClick = async () => {
    if (!user_id || !email) {
      setError("Please log in");
      localStorage.setItem("redirectURL", pathname);
      navigate("/auth/login")
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
    setParticipations([...participations, rs]);
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

const DeleteButton = ({ id, setError, setHidden }) => {
  const [isSearching, setIsSearching] = React.useState(false);

  const onClick = async () => {
    setIsSearching(true);

    const rs = await deleteTable(id);

    setIsSearching(false);
    if (rs?.errors) {
      setError(rs.errors.error);
      return
    }

    setHidden(true);
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      color="warning"
      fullWidth
    >
      Delete
    </Button>
  );
}

const JoinContent = () => {
  const { id } = useParams();
  const { loading, data } = useFetch(`${process.env.REACT_APP_ENDPOINT}/rest/tables/${id}`, undefined)

  if (loading === true) {
    return <></>
  }

  if (data === undefined) {
    return <></>
  }

  return <Join data={data} id={id} />
}

const Join = props => {
  const { data } = props;
  const { user_id, email } = useEmail();
  const [joined, setJoined] = React.useState(data.participants.map(d => d.user_id).includes(user_id));
  const [participations, setParticipations] = React.useState(data.participants);
  const [error, setError] = React.useState(null);
  const [hidden, setHidden] = React.useState(false);

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

  if (hidden) {
    return <></>
  }

  return (
    <Box>
      {joined && <Table
        {...data}
        participants={participations}
        button={
          <LeaveButton
            // participation={participations[0]}
            participations={participations}
            setJoined={setJoined}
            setParticipations={setParticipations}
            setError={setError}
          />
        }
      />}
      {!joined && <Table
        {...data}
        participants={participations}
        button={
          <Stack direction="row" spacing={2} sx={{ width: "100%"}}>
            <JoinButton
              email={email}
              participations={participations}
              setJoined={setJoined}
              setParticipations={setParticipations}
              setError={setError}
              {...data}
            />
            {data.creator_id === user_id && <DeleteButton
              setError={setError}
              setHidden={setHidden}
              {...data}
            />}
          </Stack>
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
