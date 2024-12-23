import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { shuffle } from 'lodash';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
// import ScoreEntry from './ScoreEntry';
import Loading from '../Layout/Loading';

const fetchEurovisionVotes = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionvotes/all`, {
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
}

const Container = () => {
  const [list, setList] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["votes"],
    queryFn: fetchEurovisionVotes,
  });

  useEffect(() => {
    console.log(data);
    if (data !== undefined) {
      setList(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <Component data={list} />
}

const Component = ({ data }) => {
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  console.log(list, data );

  useEffect(() => {
    const id = setInterval(() => {
      setList((prevList) => shuffle(prevList))
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const elementsRef = useRef({});
  const prevElementsPositionRef = useRef({});

  // track changes and new position elements
  useLayoutEffect(() => {
    const fn = () => {
      const newElPosition = Object.entries(elementsRef.current).reduce(
        (acc, [key, element]) => {
          if (element === null) return acc;
          const elPosition = element.getBoundingClientRect();
          acc[key] = { top: elPosition.top, left: elPosition.left };
          if (prevElementsPositionRef.current[key]?.top !== undefined && prevElementsPositionRef.current[key]?.left !== undefined) {
            const deltaY =
              (prevElementsPositionRef.current[key]?.top || 0) - elPosition.top;
            const deltaX =
              (prevElementsPositionRef.current[key]?.left || 0) - elPosition.left;
            element.style.transform = `translate(${deltaX}px,${deltaY}px )`;
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
    const id = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(id);
  }, [list]);

  return (
    <Grid container spacing={2} mt={1}>
      {list.map(({ flag, name, votes }, index) => (
        <Grid item xs={4} className="tr"
        key={flag}
        ref={(el) => {
          elementsRef.current[flag] = el;
        }}>
          {index} - {name} - {votes}
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
