import React from 'react';
import { Box, TextField, Button, Grid, Avatar, IconButton, Card, CardMedia, CardActions, CardHeader } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import { createEurovisionParticipation, searchBoardgame } from '../api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BoardgameField = ({ setBoardgame }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [label, setLabel] = React.useState("Boardgame")
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

    console.log(rs, result, results);

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
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
}

const CreateButton = ({ user_id, boardgame, exists, setShowAll }) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = async () => {
    if (!user_id) {
      localStorage.setItem("redirectURL", pathname);
      navigate("/auth/login")
      return
    }

    setIsSearching(true);

    await createEurovisionParticipation({
      boardgame_id: boardgame.id,
      user_id: user_id,
    }).catch(err => {
      console.log(err);
    })

    setShowAll(false);
    setIsSearching(false);
  };

  return (
    <Button
      variant="contained"
      disabled={isSearching}
      onClick={onClick}
      fullWidth
    >
      { exists ? "Update" : "Create" }
    </Button>
  );
}

const Create = ({ user_id, data, exists }) => {
  const [boardgame, setBoardgame] = React.useState(data);
  const [showAll, setShowAll] = React.useState(!exists);

  const handleExpandClick = () => {
    setShowAll(!showAll);
  };

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card sx={{ width: 300 }}>
            <CardHeader
              subheader={boardgame.name}
              avatar={
                <Avatar src={boardgame.square200 || "https://placehold.co/200x200"} />
              }
            />
            <CardMedia
              component="img"
              image={boardgame.square200 || "https://placehold.co/200"}
            />
            <CardActions>
              Change selection:
              <ExpandMore expand={showAll} onClick={handleExpandClick}>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={showAll} timeout="auto" unmountOnExit>
              <BoardgameField setBoardgame={setBoardgame} />
              <CreateButton
                user_id={user_id}
                boardgame={boardgame}
                exists={exists}
                setShowAll={setShowAll}
              />
            </Collapse>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Create;
