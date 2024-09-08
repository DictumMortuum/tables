import React from 'react';
import ResultCard from './ResultCard';
import Grid from '@mui/material/Grid';

const getPriority = (col, name) => {
  const p = col.filter(d => d.checked).map(d => d.name);
  const i = p.indexOf(name);

  if (i >= 0) {
    // console.log((p.length - i) * 0.1, name)
    return (p.length - i) * 0.1;
  }

  return 0;
}

const Component = ({ data, state: { players = 4, time = 120, coop = false, priority, rated } }) => {
  const games = {};
  const rs = [];

  // fill the games object with data.
  Object.keys(data).map(d => {
    const { collection } = data[d];

    collection.map(g => {
      if (games[g.id] === undefined) {
        games[g.id] = [];
      }

      if (g.Status.own !== "1") {
        return
      }

      if (g.user_rating === 0 && rated) {
        return
      }

      games[g.id].push(g);
      return g;
    });

    return d;
  });

  // calculate the best game.
  Object.keys(games).map(d => {
    const game = games[d];
    // console.log(d, game);
    let cost = 0;

    // if no one owns the game, remove from the candidates.
    if (game.length === 0) {
      return d;
    }

    const {
      id,
      name,
      minplayers,
      maxplayers,
      bestminplayers,
      bestmaxplayers,
      minplaytime,
      maxplaytime,
      average,
      rank,
      cooperative,
      url
    } = game[0].stats;

    // if the game doesn't have any stats, remove from the candidates.
    if (
      minplayers === null ||
      maxplayers === null ||
      bestminplayers === null ||
      bestmaxplayers === null ||
      minplaytime === null ||
      maxplaytime === null ||
      average === null ||
      cooperative === null
    ) {
      return d;
    }

    // if the player count is not correct, remove from the candidates.
    if (game[0].stats.minplayers > players || game[0].stats.maxplayers < players) {
      return d;
    }

    // if the group doesn't want a coop game, remove it from the candidates.
    if (cooperative !== coop) {
      return d;
    }

    // contribute to cost based on the game's rank.
    cost += rank * getPriority(priority, "rank")

    // contribute to cost based on the min playtime.
    cost += Math.abs(minplaytime - time) * getPriority(priority, "playtime");

    // contribute to cost based on the max playtime.
    cost += Math.abs(maxplaytime - time) * getPriority(priority, "playtime");

    // contribute to cost based on the game's average rating.
    cost += (10 - average) * getPriority(priority, "rating");

    // contribute to cost if the max player's don't fit the recommended rating.
    cost += Math.abs(bestmaxplayers - players) * getPriority(priority, "recommended players");

    // contribute to cost if the min player's don't fit the recommended rating.
    cost += Math.abs(bestminplayers - players) * getPriority(priority, "recommended players");

    games[d].map(g => {
      if (g.user_rating !== 0) {
        console.log(getPriority(priority, "user rating"))
        cost += (10.0 - g.user_rating) * getPriority(priority, "user rating") / games[d].length;
      }

      return d;
    });

    rs.push({
      id,
      name,
      cost,
      url
    });

    return d;
  });

  console.log(rs.length);

  rs.sort((a, b) => a.cost - b.cost);

  return (
    <Grid container>
      {rs.splice(0, 20).map((d, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <ResultCard {...d} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Component;
