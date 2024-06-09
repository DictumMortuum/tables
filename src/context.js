import React, { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [email, setEmail] = React.useState(null);
  const [user_id, setUserId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  return (
    <UserContext.Provider value={{ email, setEmail, user_id, setUserId, open, setOpen, msg, setMsg }}>
      {children}
    </UserContext.Provider>
  );
}
