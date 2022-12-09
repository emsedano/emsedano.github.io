import { signInWithEmailAndPassword, Auth, signOut } from 'firebase/auth';

export function Authenticate(auth: Auth) {
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return { auth, signIn, logOut };
}
