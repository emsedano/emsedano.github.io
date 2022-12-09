import React from 'react';

const UserContext = React.createContext(null);

function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useCount must be used within a AuthProvider`);
  }
  const [user, setUser] = context;
  const [loggedIn, setLoggedIn] = context;

  return { user, loggedIn, setUser, setLoggedIn };
}

function UserProvider(props) {
  const [user, setUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const value = React.useMemo(() => [user, setUser], [loggedIn, setLoggedIn]);
  return <UserContext.Provider value={value} {...props} />;
}

export { UserProvider, useUser };
