import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import { UserContext } from '../../context';

const Drawer = ({ state, setState }) => {
  const { state: { user: { components } } } = React.useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <SwipeableDrawer
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ width: 256 }}
      >
        <List>
          {components.map((d, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton component={Link} to={d.link}>
                <ListItemIcon>
                  {d.component}
                </ListItemIcon>
                <ListItemText primary={d.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

export default Drawer;
