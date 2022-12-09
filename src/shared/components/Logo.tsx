import React from 'react';
import logo from '../../logo.svg';
export function Logo({ size = '48x48', className = 'avatar' }) {
  return (
    <figure className={className}>
      <p className={'image is-' + size}>
        <img src={logo} alt="logo" />
      </p>
    </figure>
  );
}
