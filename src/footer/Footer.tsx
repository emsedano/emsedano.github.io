import React from 'react';

export function Footer() {
  return (
    <footer className="footer no-print">
      <div className="content has-text-centered is-small">
        <p>
          By{' '}
          <strong>
            <a href="/edit">Elias Martinez</a>{' '}
          </strong>{' '}
          using <a href="https://es.reactjs.org/">React</a>, <a href="https://firebase.google.com">Firebase</a>.
        </p>

        <p>Dallas, TX / all rights reserved, May, {new Date().getFullYear()}</p>
        <a href="https://bulma.io">
          <img src="https://bulma.io/images/made-with-bulma--black.png" alt="Made with Bulma" width="128" height="24" />
        </a>
      </div>
    </footer>
  );
}
