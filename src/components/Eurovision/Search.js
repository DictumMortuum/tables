import React from 'react';
import { TextField, Grid } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const searchBoardgame = async name => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/boardgames?filter={"name@simplelike":"${name}"}&range=[0,9]`, {
    method: "GET",
    headers: {
      "SA": localStorage.getItem("st"),
    }
  });

  return rs.json();
}

const Component = ({ setBoardgame }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [label, setLabel] = React.useState("Search Boardgame")
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [result, setResult] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdown = (e) => {
    setResult(e.target.value);
    const rs = results.filter(d => d.id === e.target.value);

    if (rs.length === 1) {
      setBoardgame(rs[0]);
      setLabel(rs[0].name);
    }
  }

  React.useEffect(() => {
    const submit = async () => {
      setIsSearching(true);

      if (debouncedSearchTerm) {
        const rs = await searchBoardgame(debouncedSearchTerm);
        setResults(rs);
      }

      setIsSearching(false);
    };

    submit();
  }, [debouncedSearchTerm, setBoardgame]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          label={label}
          value={searchTerm}
          onChange={handleChange}
          disabled={isSearching}
          fullWidth
        />
      </Grid>
      {results.length > 0 && <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>{results.length} results</InputLabel>
          <Select
            value={result}
            label="Boardgame"
            onChange={handleDropdown}
            disabled={isSearching}
            autoWidth
          >
            {results.map(d => (
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>}
    </Grid>
  );
}

export default Component;
