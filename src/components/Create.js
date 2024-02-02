import React from 'react';
import { Box, TextField, Button, ListItem, ListItemIcon, Avatar } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDebounce } from '@uidotdev/usehooks';
import { createParticipant, createTable, getBoardgame } from './api';
import { TableContainer } from './Table';
import { useEmail } from '../hooks/useEmail';
import { useNavigate } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';

const BoardgameField = ({ setBoardgame }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [label, setLabel] = React.useState("Boardgame Id")
  const [isSearching, setIsSearching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const submit = async () => {
      setIsSearching(true);

      if (debouncedSearchTerm) {
        const { errors, ...rest } = await getBoardgame(debouncedSearchTerm);

        if (errors === undefined) {
          setBoardgame(rest);
          setLabel(rest.name);
        } else {
          setLabel("Not Found");
        }
      }

      setIsSearching(false);
    };

    submit();
  }, [debouncedSearchTerm, setBoardgame]);

  return (
    <TextField
      label={label}
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      disabled={isSearching}
    />
  );
}

const LocationField = ({ location, setLocation }) => {
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <TextField
      label="Location"
      fullWidth
      value={location}
      onChange={handleChange}
    />
  );
}

const SeatsField = ({ seats, setSeats}) => {
  const handleChange = (e) => {
    setSeats(e.target.value);
  };

  return (
    <TextField
      type="number"
      label="Seats"
      fullWidth
      value={seats}
      onChange={handleChange}
    />
  );
}

const DateField = ({ setDate }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DateTimePicker
        label={'Date'}
        views={['year', 'day', 'hours', 'minutes']}
        onChange={d => setDate(d)}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

const CreateButton = ({ user_id, boardgame, location, date, seats, creator }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const navigate = useNavigate();

  const onClick = async () => {
    if (!location || !boardgame.id || !date) {
      console.log(!location, !boardgame.id, !date, "whoops");
      return
    }
    setIsSearching(true);

    const table = await createTable({
      boardgame_id: boardgame.id,
      creator_id: user_id,
      location,
      date: date.toDate(),
      creator,
      seats: parseInt(seats),
    });
    console.log(table);

    const participant = await createParticipant({
      table_id: table.id,
      user_id: user_id,
      name: creator,
    });
    console.log(participant);

    setIsSearching(false);

    navigate("/")
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      fullWidth
    >
      Create
    </Button>
  );
}

const Create = () => {
  const [boardgame, setBoardgame] = React.useState({});
  const [seats, setSeats] = React.useState(0);
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState(undefined);
  const { email, user_id } = useEmail();

  return (
    <Box>
      <h2>Create Table</h2>
      <TableContainer
        boardgame={boardgame}
        nameElement={
          <BoardgameField setBoardgame={setBoardgame} />
        }
        participantsElement={
          <ListItem>
            <ListItemIcon>
              <Avatar>
                <EventIcon />
              </Avatar>
            </ListItemIcon>
            <SeatsField setSeats={setSeats} />
          </ListItem>
        }
        dateElement={
          <DateField setDate={setDate} />
        }
        locationElement={
          <LocationField location={location} setLocation={setLocation} />
        }
        buttonElement={
          <CreateButton
            user_id={user_id}
            location={location}
            date={date}
            boardgame={boardgame}
            seats={seats}
            creator={email}
          />
        }
      />
    </Box>
  );
}

export default Create;
