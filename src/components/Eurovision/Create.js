import React from 'react';
import { Box, Button, Avatar, IconButton, Card, CardMedia, CardHeader, CardActions } from '@mui/material';
import { createEurovisionParticipation } from '../api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context';
import { useEmail } from '../../hooks/useEmail';
import Search from './Search';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../Layout/Loading';

const fetchUserParticipation = async ({ user_id }) => {
  const rs = await fetch(`${process.env.REACT_APP_ENDPOINT}/rest/eurovisionparticipations/user/${user_id}`);
  return rs.json();
}

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

const CreateButton = ({ boardgame, setShowAll }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user_id, email } = useEmail();
  const { pathname } = useLocation();
  const { setMsg, setOpen } = React.useContext(UserContext);

  const { isPending, mutate } = useMutation({
    mutationFn: createEurovisionParticipation,
    onSuccess: (data, variables, context) => {
      setMsg("Your participation was saved successfully.");
      setOpen(true);
      setShowAll(false);
      queryClient.invalidateQueries({ queryKey: ['participations'] });
    },
    onError: (error, variables, context) => {
      setMsg("Something went wrong, please try again.");
      setOpen(true);
    }
  });

  const onClick = async () => {
    if (!user_id || !email) {
      localStorage.setItem("redirectURL", pathname);
      navigate("/auth/login");
      return;
    }

    mutate({
      boardgame_id: boardgame.id,
      user_id,
      email,
    });
  };

  return (
    <Button
      variant="contained"
      disabled={isPending}
      onClick={onClick}
      fullWidth
    >
      set participation
    </Button>
  );
}

const CreateContainer = () => {
  const { user_id } = useEmail();

  const { data, isLoading } = useQuery({
    queryKey: ["participation", user_id],
    queryFn: () => fetchUserParticipation({ user_id }),
    enabled: !!user_id,
    initialData: { boardgame: {}},
  });

  if (isLoading) {
    return <Loading />;
  }

  return <Create exists={!!user_id} data={data.boardgame} />
}

const Create = ({ data, exists }) => {
  const [boardgame, setBoardgame] = React.useState(data);
  // const [showAll, setShowAll] = React.useState(!exists);
  const [showAll, setShowAll] = React.useState(true);

  React.useEffect(() => {
    setBoardgame(data);
  }, [data]);

  const handleExpandClick = () => {
    setShowAll(!showAll);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: 300, padding: 1 }}>
        <CardHeader
          subheader={boardgame.name}
          avatar={
            <Avatar src={boardgame.square200 || "https://placehold.co/200x200"} />
          }
          action={
            <ExpandMore expand={showAll} onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          }
        />
        <Collapse in={showAll} timeout="auto" unmountOnExit>
          <CardMedia
            component="img"
            image={boardgame.square200 || "https://placehold.co/200"}
            sx={{ marginBottom: 2 }}
          />
          <CardActions>
            <Search setBoardgame={setBoardgame} />
          </CardActions>
          <CardActions>
            <CreateButton
              boardgame={boardgame}
              exists={exists}
              setShowAll={setShowAll}
            />
          </CardActions>
        </Collapse>
      </Card>
    </Box>
  );
}

export default CreateContainer;
