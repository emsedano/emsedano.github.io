import React, { Fragment } from 'react';
import { Resume } from './resume/Resume';
import { Loader } from './loading/Loader';
import { useProfile } from './core/ProfileContext';
import { Footer } from './footer/Footer';
import { Profile } from './resume/profile/Profile';

export function App() {
  const state = useProfile();
  const { profile, loadingStatus } = state;

  const content =
    profile == null ? (
      <Loader text={loadingStatus} />
    ) : (
      <Fragment>
        <Profile></Profile>
        <Resume />
      </Fragment>
    );

  return <Fragment>{content}</Fragment>;
}
