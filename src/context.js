import React, { createContext } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TableBarIcon from '@mui/icons-material/TableBar';
// import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';

export const UserContext = createContext(null);

const generateComponents = email => [{
  name: "Home",
  link: "/",
  component: <TableBarIcon />,
},
{
  name: "Eurovision",
  link: "/eurovision",
  component: <EmojiEventsIcon />,
},
// {
//   name: "Finder",
//   link: "/finder",
//   component: <SearchIcon />
// },
{
  name: "Analyzer",
  link: "/analyzer",
  component: <BarChartIcon />
}];

const parseLoginCookie = () => {
  const raw = localStorage.getItem('auth');
  const auth = JSON.parse(raw);

  if (auth === null) {
    return {
      email: null,
      user_id: null,
      components: generateComponents(null),
    }
  }

  const { status } = auth;

  if (status !== "OK") {
    return {
      email: null,
      user_id: null,
      components: generateComponents(null),
    }
  }

  const { user: { id, email }} = auth;

  return {
    email,
    user_id: id,
    components: generateComponents(email),
  }
}

const getConfig = hm => config => {
  if (hm[config] !== undefined) {
    return hm[config];
  }

  return null;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { id, participant } = action;
      const participants = state.participants;
      participants[id] = participant;

      return {
        ...state,
        participants,
      }
    }

    case "increment": {
      return {
        ...state,
        count: state.count + 1,
      }
    }

    case "decrement": {
      return {
        ...state,
        count: state.count === 0 ? 0 : state.count - 1,
      }
    }

    case "time": {
      return {
        ...state,
        time: action.time,
      }
    }

    case "coop": {
      return {
        ...state,
        coop: action.coop,
      }
    }

    case "rated": {
      return {
        ...state,
        rated: action.rated,
      }
    }

    case "players": {
      return {
        ...state,
        players: action.players,
      }
    }

    case "priority": {
      return {
        ...state,
        priority: action.priority,
      }
    }

    case "priority::check": {
      return {
        ...state,
        priority: state.priority.map(d => {
          if (d.name === action.name) {
            return {
              ...d,
              checked: action.checked,
            }
          } else {
            return d;
          }
        })
      }
    }

    case "user::set": {
      return {
        ...state,
        user: parseLoginCookie(),
      }
    }

    case "bgg_user::set": {
      return {
        ...state,
        bgg_user: action.bgg_user,
      }
    }

    case "collection::set": {
      return {
        ...state,
        collection: action.collection,
      }
    }

    case "configuration::set": {
      const hm = {};

      action.data.forEach(d => {
        hm[d.config] = d.value;
      });

      return {
        ...state,
        configurations: hm,
        getConfig: getConfig(hm),
      }
    }

    default: {
      console.log(action);
      return {
        ...state,
      }
    }
  }
}

export const UserProvider = ({ children }) => {
  const [email, setEmail] = React.useState(null);
  const [user_id, setUserId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, {
    bgg_user: "",
    collection: [],
    user: parseLoginCookie(),
    configurations: {},
    participants: {},
    count: 1,
    players: 4,
    time: 120,
    coop: false,
    rated: true,
    priority: [{
      id: 5,
      name: "user rating",
      checked: true,
    }, {
      id: 1,
      name: "rank",
      checked: true,
    }, {
      id: 2,
      name: "playtime",
      checked: true,
    }, {
      id: 3,
      name: "rating",
      checked: true,
    }, {
      id: 4,
      name: "recommended players",
      checked: true,
    }],
  });

  return (
    <UserContext.Provider value={{
      email,
      setEmail,
      user_id,
      setUserId,
      open,
      setOpen,
      msg,
      setMsg,
      loading,
      setLoading,
      state,
      dispatch
    }}>
      {children}
    </UserContext.Provider>
  );
}
