import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Layout/Loading';
import Button from '@mui/material/Button';
import { UserContext } from '../../context';
import XML2JS from 'xml2js'

const fetchCollectionXML = async bgg_user => {
  const rs = await fetch(`https://api.geekdo.com/xmlapi2/collection?own=1&stats=1&username=${encodeURI(bgg_user)}`, {
    method: "GET",
  });

  if (rs.status === 202) {
    return Promise.fail({
      error: "wait"
    })
  }

  return rs.text().then(rs => {
    const { ids, collectionData } = parseXML(rs);
    return {
      ids,
      collectionData,
    }
  });
}

const fetchCollectionInfo = async ids => {
  const rs = await fetch(`${process.env.REACT_APP_PLAYER_ENDPOINT}/player/collection`, {
    method: "POST",
    body: JSON.stringify({ ids }),
  });

  return rs.json();
}

const parseXML = data => {
  const gameIds = [];
  const collectionData = [];

  XML2JS.parseString(data, (err, result) => {
    if (result.items && result.items.$.totalitems !== '0') {
      // numGames = Number(result.items.$.totalitems);

      result.items.item.forEach(game => {
        // Info          *BoardgameInfo `json:"info"`
        gameIds.push(parseInt(game.$.objectid));
        collectionData.push({
          game: game,
          gameId: game.$.objectid,
          name: game.name[0]._,
          image: game.image[0],
          thumbnail: game.thumbnail[0],
          minPlayers: game.stats[0].$.minplayers,
          maxPlayers: game.stats[0].$.maxplayers,
          playingTime: game.stats[0].$.playingtime,
          numOwned: game.stats[0].$.numowned,
          yearPublished: game.yearpublished[0],
          owned: game.status[0].$.own,
          preOrdered: game.status[0].$.preordered,
          forTrade: game.status[0].$.fortrade,
          previousOwned: game.status[0].$.prevowned,
          want: game.status[0].$.want,
          wantToPlay: game.status[0].$.wanttoplay,
          wantToBuy: game.status[0].$.wanttobuy,
          wishlist: game.status[0].$.wishlist,
          numPlays: game.numplays[0],
          rating: game.stats[0].rating[0].average[0].$.value,
          averageRating: game.stats[0].rating[0].average[0].$.value,
          bggRating: game.stats[0].rating[0].average[0].$.value,
          isExpansion: false,
          rank: 0,
        });
      });
    }
  });

  return {
    ids: gameIds,
    collectionData,
  }
}

const Component = () => {
  const { state: { bgg_user }, dispatch } = React.useContext(UserContext);
  const [value, setValue] = React.useState(bgg_user);

  const collection = useQuery({
    queryKey: ["collection", value],
    queryFn: () => fetchCollectionXML(value),
    enabled: value !== "",
    retryDelay: 5000,
  });

  const { data, isLoading, status } = useQuery({
    queryKey: ["collection_info", value],
    queryFn: () => fetchCollectionInfo(collection.data?.ids),
    enabled: collection.status === "success",
  });

  console.log(data);

  React.useEffect(() => {
    if (status === "success") {
      dispatch({
        type: "collection::set",
        // collection: data.data,
        collection: [],
      });
    }
  }, [dispatch, data, status])

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = async () => {
    setValue(bgg_user);
  }

  return (
    <Button variant="contained" disabled={isLoading} onClick={handleClick}>Fetch</Button>
  );
}

export default Component;
