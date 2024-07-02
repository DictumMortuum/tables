import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';

const fetchPlayersWithCollection = async () => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/finderusers`, {
    method: "GET",
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
}

const fetchCollection = async id => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/finderusers/${id}`, {
    method: "GET",
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
}

const Component = ({ id, dispatch, participant }) => {
  const [value, setValue] = React.useState("");

  const users = useQuery({
    queryKey: ["finder"],
    queryFn: fetchPlayersWithCollection,
  });

  const { data, status, isLoading } = useQuery({
    queryKey: ["collection", value],
    queryFn: () => fetchCollection(value),
    enabled: value !== "",
  });

  React.useEffect(() => {
    if (participant !== undefined) {
      setValue(participant.id);
    }
  }, [participant]);

  React.useEffect(() => {
    console.log("loading", status, isLoading, data);
    if (status === "success") {
      dispatch({
        type: "add",
        id,
        participant: data,
      });
    }
  }, [isLoading, dispatch, id, data, status])

  if (users.isLoading) {
    return <Loading />;
  }

  const handleDropdown = (e) => {
    setValue(e.target.value);
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{users.data.length} results</InputLabel>
      <Select
        value={value}
        onChange={handleDropdown}
        autoWidth
      >
        {users.data.map(d => (
          <MenuItem key={d.id} value={d.id}>{d.bgg_username}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Component;
