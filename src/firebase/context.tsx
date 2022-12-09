import React from 'react';
import { Firebase } from './firebase';

const FirebaseContext = React.createContext<Firebase>(new Firebase());

function useFirebase() {
  const context = React.useContext(FirebaseContext);
  return context;
}

export default FirebaseContext;
export { useFirebase as getFirebase };
