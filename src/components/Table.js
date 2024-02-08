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

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Table = ({ id, creator, boardgame, location, date, seats, participants, button, expand=false }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <TableContainer
      id={id}
      boardgame={boardgame}
      expand={expand}
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
        <ListItemText primary={new Date(date).toLocaleString('en-GB', dateOptions)} secondary="date" />
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

const TableContainer = ({ id, boardgame, nameElement, creatorElement, participantsElement, dateElement, locationElement, buttonElement }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
            {creatorElement !== undefined && <ListItem>
              <ListItemIcon>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>
              {creatorElement}
            </ListItem>}
            {participantsElement}
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
            <ListItem>
              {buttonElement}
            </ListItem>
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
