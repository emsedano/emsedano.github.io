import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered is-small">
        <p>
          By{' '}
          <strong>
            <a href="https://jgthms.com">Elias Martinez</a>{' '}
          </strong>{' '}
          using <a href="https://es.reactjs.org/">React</a>, <a href="https://firebase.google.com">Firebase</a> {' & '}
          <a href="https://bulma.io/">Bulma</a>. All rights reserved May, 2020.
        </p>
      </div>
    </footer>
  );
}
