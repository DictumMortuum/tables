import React, { createContext } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [email, setEmail] = React.useState(null);
  const [user_id, setUserId] = React.useState(null);

  return (
    <UserContext.Provider value={{ email, setEmail, user_id, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
