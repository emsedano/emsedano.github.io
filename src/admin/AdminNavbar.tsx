import React from 'react';
import { getFirebase } from '../firebase/context';
import { Logo } from '../shared/components/Logo';
import { useAuthState } from 'react-firebase-hooks/auth';

export function AdminNavbar() {
  const { authService } = getFirebase();
  const [user] = useAuthState(authService.auth);

  const logOutLink =
    user != null ? (
      <a className="navbar-item" onClick={() => authService.logOut()}>
        Log Out
      </a>
    ) : null;
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Logo />
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">{logOutLink}</div>
      </div>
    </nav>
  );
}
