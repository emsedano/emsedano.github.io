import React from 'react';
import { ProfileProps } from '../../core/ProfileModel';
import logo from '../../logo.svg';
import './Profile.scss';

export function Profile({ profile }: ProfileProps) {
  return (
    <article className="profile media">
      <figure className="media-left">
        <p className="image is-128x128">
          <img src={logo} alt="logo" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <h1 className="title">
            <strong>{profile.name}</strong>
          </h1>
          <h2 className="subtitle">{profile.career}</h2>
        </div>
        <div className="content is-small">
          <p>
            <small>{profile.contact.phone}</small>
          </p>
          <p>
            <small>
              <a href="mailto:someone@yoursite.com">{profile.contact.email}</a>
            </small>
          </p>
        </div>
      </div>
    </article>
  );
}
