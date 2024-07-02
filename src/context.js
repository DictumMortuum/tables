import React, { createContext } from 'react';

export const UserContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const { id, participant } = action;
      const participants = state.participants;
      participants[id] = participant;

      console.log("action", action);

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
    participants: {},
    count: 1,
    players: 4,
    time: 120,
    coop: false,
    priority: [{
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
