import React from 'react';

export function TileSet(props) {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical">{props.children}</div>
    </div>
  );
}
