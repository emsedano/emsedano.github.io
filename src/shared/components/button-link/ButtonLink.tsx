import React from 'react';
import './ButtonLink.scss';

export function ButtonLink({ children, onClick }: { children: any; onClick: () => any }) {
  return (
    <span role="button" className="ButtonLink" onClick={onClick}>
      {children}
    </span>
  );
}
