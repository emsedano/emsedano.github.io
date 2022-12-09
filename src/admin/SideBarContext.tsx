import React from 'react';

const SideBarContext = React.createContext(null);

function useSideBar() {
  const context = React.useContext(SideBarContext);
  if (!context) {
    throw new Error(`useCount must be used within a AuthProvider`);
  }
  const [active, setActive] = context;
  const activate = next => () => {
    sessionStorage.setItem('active', next);
    setActive(next);
  };
  return { active, activate };
}

function SideBarProvider(props) {
  const [active, setActive] = React.useState(sessionStorage.getItem('active') ?? 'profile');
  const value = React.useMemo(() => [active, setActive], [active]);
  return <SideBarContext.Provider value={value} {...props} />;
}

export { SideBarProvider, useSideBar };
