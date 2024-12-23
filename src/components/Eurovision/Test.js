import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useConfig from '../../hooks/useConfig';
import './Scoreboard.css';

const splitIntoHalf = col => {
  const halfwayThrough = Math.ceil(col.length / 2);
  return [
    col.slice(0, halfwayThrough),
    col.slice(halfwayThrough, col.length)
  ];
};

const customSort = (a, b) => {
  if (b.votes !== a.votes) {
    return b.votes - a.votes;
  } else {
    for (let i = 0; i < 4; i++) {
      if (b.name.charCodeAt(i) - a.name.charCodeAt(i) !== 0) {
        return b.name.charCodeAt(i) - a.name.charCodeAt(i);
      }
    }
  }
};

const verticalShow = col => {
  const tmp = col.sort(customSort);
  const retval = [];
  const [left, right] = splitIntoHalf(tmp);

  left.forEach((d, i) => {
    retval.push(d);

    if (right[i] !== undefined) {
      retval.push(right[i]);
    }
  });

  return retval;
};

const fetchEurovisionVotes = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/all`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
};

const Container = () => {
  const [list, setList] = useState([]);
  const EUROVISION_POLLING_ENABLED = useConfig("EUROVISION_POLLING_ENABLED");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["votes"],
    queryFn: fetchEurovisionVotes,
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (EUROVISION_POLLING_ENABLED) {
        refetch();
      }
    }, 2000);
    return () => clearInterval(id);
  }, [refetch, EUROVISION_POLLING_ENABLED]);

  useEffect(() => {
    if (data !== undefined) {
      setList(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return <Component data={list} />;
};

const Component = ({ data }) => {
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const elementsRef = useRef({});
  const prevElementsPositionRef = useRef({});

  useLayoutEffect(() => {
    const updatePositions = () => {
      const newElPosition = Object.entries(elementsRef.current).reduce(
        (acc, [key, element]) => {
          if (element === null) return acc;
          const elPosition = element.getBoundingClientRect();
          acc[key] = { top: elPosition.top, left: elPosition.left };
          if (
            prevElementsPositionRef.current[key]?.top !== undefined &&
            prevElementsPositionRef.current[key]?.left !== undefined
          ) {
            const deltaY =
              (prevElementsPositionRef.current[key]?.top || 0) - elPosition.top;
            const deltaX =
              (prevElementsPositionRef.current[key]?.left || 0) - elPosition.left;
            element.style.transform = `translate(${deltaX}px,${deltaY}px)`;
            element.style.transition = "transform 0s";
          }
          return acc;
        },
        {}
      );
      prevElementsPositionRef.current = newElPosition;
      requestAnimationFrame(() => {
        Object.values(elementsRef.current).forEach((element) => {
          if (element === null) return;
          element.style.transform = "";
          element.style.transition = "transform 1s";
        });
      });
    };
    const id = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(id);
  }, [list]);

  const handleCardClick = (boardgame_id) => {
    window.open(`https://boardgamegeek.com/boardgame/${boardgame_id}`, '_blank');
  };

  return (
    <Grid container spacing={2}>
      {verticalShow(list).map(({ flag, name, email, votes, boardgame_id }, index) => (
        <Grid
          item
          xs={6}
          key={flag}
          ref={(el) => {
            elementsRef.current[flag] = el;
          }}
        >
          <Card
            className="scoreboard-card"
            sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', cursor: 'pointer' }}
            onClick={() => handleCardClick(boardgame_id)}
          >
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '12px', margin: '12px' }}
              image={flag}
              alt={`${name} flag`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent sx={{ padding: '16px 16px 16px 0' }}>
                <Typography variant="h6" component="div" sx={{ color: '#1d3557', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.25rem' }}>
                  {votes} points
                </Typography>
                <Typography variant="body1" sx={{ color: '#457b9d', fontSize: '1rem', marginBottom: '4px' }}>
                  {name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#a8dadc', fontSize: '0.9rem' }}>
                  {email}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Container;

/* Scoreboard.css */
