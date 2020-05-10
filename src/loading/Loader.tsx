import React from 'react';
import logo from '../logo.svg';
import './Loader.scss';

const defaultText = { text: 'Loading' };

export function Loader({ text }: { text: string } = defaultText) {
  return (
    <div className="Loader">
      <header className="Loader-header">
        <img src={logo} className="Loader-logo" alt="logo" />
        <p>{text}</p>
      </header>
    </div>
  );
}
