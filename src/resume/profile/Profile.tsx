import React from 'react';
import { ProfileProps } from '../../core/ProfileModel';
import logo from '../../logo.svg';
import './Profile.scss';

export function Profile({ profile }: ProfileProps) {
  return (
    <div className="container">
      <section className="section profile">
        <article className="media">
          <figure className="media-left">
            <p className="image is-128x128">
              <img src={logo} alt="logo" />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <h1 className="title no-margin-bottom">
                <strong>{profile.name}</strong>
              </h1>
              <h2 className="subtitle no-margin-bottom">{profile.career}</h2>
            </div>
            <div className="content">
              <p>
                <small>{profile.contact.phone}</small>
              </p>
              <p>
                <small>
                  <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                </small>
              </p>
              <p className="social-link">
                <a target="_blank" rel="noopener noreferrer" href={profile.social.linkedIn}>
                  <span className="icon">
                    <i className="fab fa-linkedin fa-lg"></i>
                  </span>
                </a>
                <a target="_blank" rel="noopener noreferrer" href={profile.social.github}>
                  <span className="icon">
                    <i className="fab fa-github fa-lg"></i>
                  </span>
                </a>
                <a target="_blank" rel="noopener noreferrer" href={profile.social.instagram}>
                  <span className="icon">
                    <i className="fab fa-instagram fa-lg"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
