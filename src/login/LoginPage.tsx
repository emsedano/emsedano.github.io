import React, { useState, useEffect } from 'react';
import { getFirebase } from '../firebase/context';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './LoginPage.scss';
import { Logo } from '../shared/components/Logo';

export function LoginPage() {
  const { authService } = getFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, _error] = useAuthState(authService.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/edit');
  }, [user, loading]);

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <div className="box">
              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                  <Logo size="none" />
                </div>
              </div>

              <div>
                <div className="field">
                  <div className="control">
                    <input
                      type="text"
                      className="login__textBox"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="E-mail Address"
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      type="password"
                      className="login__textBox"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                </div>

                <button
                  className="button is-block is-dark is-small is-fullwidth"
                  onClick={() => authService.signIn(email, password)}
                >
                  Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <p className="has-text-grey"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
