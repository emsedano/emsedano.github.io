import React from 'react';
import './Tile.scss';
export function Tile({ title = null, className = '', children }) {
  const classes = className ? `tile ${className}` : 'tile';
  return (
    <div className={classes}>
      {title ? <p className="title">{title}</p> : ''}
      {children}
    </div>
  );
}
