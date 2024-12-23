import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const uniq = data => {
  const tmp = {};

  data.forEach(d => {
    tmp[d.gameId] = d;
  });

  return Object.keys(tmp).map(d => tmp[d]);
}

const transform = num => data => {
  return uniq(data)
    .filter(d => d.owned === true && d.info !== undefined && d.info !== null)
    .filter(d => d.info.best_min_players !== null && d.info.best_max_players !== null)
    .filter(d => d.info.best_min_players <= num)
    .filter(d => d.info.best_max_players >= num)
    .sort((a, b) => b.averageRating - a.averageRating)
    // .slice(0, 10)
}

const expansions = filterExpansions => data => {
  if (filterExpansions === true) {
    return data.filter(d => d.isExpansion === false);
  } else {
    return data;
  }
}

const show = showAll => data => {
  if (showAll === true) {
    return data;
  } else {
    return data.slice(0, 10);
  }
}

const Component = ({ data, num, width, showAll, filterExpansions }) => {
  const d1 = transform(num)(data);
  const d2 = expansions(filterExpansions)(d1);
  const d3 = show(showAll)(d2);

  return (
    <List sx={{ width }}>
      {d3.map(d => (
        <ListItem>
          <ListItemAvatar>
            <Avatar src={d.thumbnail} />
          </ListItemAvatar>
          <ListItemText primary={d.name} secondary={`rating ${d.averageRating}`} />
        </ListItem>
      ))}
    </List>
  );
}

export default Component;
