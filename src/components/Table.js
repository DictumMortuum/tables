import React from 'react';
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Avatar,
  Collapse,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const yyyymmdd = (d, add) => {
  const MM = d.getMonth() + 1; // getMonth() is zero-based
  const DD = d.getDate();
  const year = [d.getFullYear(), (MM > 9 ? '' : '0') + MM, (DD > 9 ? '' : '0') + DD].join('-');
  return [year, hhmm(d, add)].join('T');
};

const hhmm = (d, add) => {
  var hh = d.getHours();
  const mm = d.getMinutes();
  if (add !== undefined) {
    hh += add
  }
  return [(hh > 9 ? '' : '0') + hh, (mm > 9 ? '' : '0') + mm].join(':');
}

const Table = props => {
  const { id, creator, boardgame, location, date, seats, participants, button, expand=false } = props;
  const [open, setOpen] = React.useState(false);
  const d = new Date(date);
  const now = new Date();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <TableContainer
      id={id}
      boardgame={boardgame}
      expand={expand}
      archive={d < now}
      participants={participants}
      nameElement={
        <ListItemText primary={
          <Typography variant="h5">
            {boardgame.name}
          </Typography>
        } secondary={
          <Link to={`https://boardgamegeek.com/boardgame/${boardgame.id}`}>[bgg link]</Link>
        }
        />
      }
      creatorElement={
        <ListItemText primary={creator} secondary="host" />
      }
      participantsElement={
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Avatar>
                <PeopleIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={`${participants.length}/${seats}`} secondary="participants" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {participants.map((d, i) => (
                <ListItem key={i} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={d.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      }
      dateElement={
        <ListItemText primary={d.toLocaleString('en-GB', dateOptions)} secondary="date" />
      }
      addToCalendarElement={
        <AddToCalendarButton
          name={boardgame.name}
          startDate={yyyymmdd(d)}
          endDate={yyyymmdd(d, 4)}
          options={['Apple','Google','Yahoo','iCal']}
          timeZone="Europe/Athens"
          location={location}
          // organizer={creator}
        ></AddToCalendarButton>
      }
      locationElement={
        <ListItemText primary={
          <Link to={
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
          }>{location}</Link>
        } secondary="location" />
      }
      buttonElement={button}
    />
  );
}

const TableContainer = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    id,
    boardgame,
    nameElement,
    creatorElement,
    participantsElement,
    dateElement,
    locationElement,
    buttonElement,
    addToCalendarElement,
    archive,
  } = props;

  let right_width, left_width;
  if (!matches) {
    right_width = "0%";
    left_width = "100%";
  } else {
    right_width = "35%";
    left_width = "65%";
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: left_width }}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar
                  component={id === undefined ? "div" : Link}
                  to={`/show/${id}`}
                  alt="Remy Sharp"
                  src={boardgame.square200 || "https://placehold.co/200x200"}
                />
              </ListItemIcon>
              {nameElement}
            </ListItem>
            { addToCalendarElement !== undefined && !archive && <ListItem>
              {addToCalendarElement}
            </ListItem>}
            <ListItem>
              <ListItemIcon>
                <Avatar>
                  <EventIcon />
                </Avatar>
              </ListItemIcon>
              {dateElement}
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar>
                  <LocationOnIcon />
                </Avatar>
              </ListItemIcon>
              {locationElement}
            </ListItem>
            {creatorElement !== undefined && <ListItem>
              <ListItemIcon>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>
              {creatorElement}
            </ListItem>}
            {participantsElement}
            { !archive && <ListItem>
              {buttonElement}
            </ListItem>}
          </List>
        </CardContent>
      </Box>
      {matches &&
        <CardMedia
          component={id === undefined ? "img" : Link}
          to={`/show/${id}`}
          sx={{ width: right_width }}
          image={boardgame.square200 || "https://placehold.co/200"}
        />
      }
    </Card>
  );
}

export default Table;
export {
  TableContainer
};
