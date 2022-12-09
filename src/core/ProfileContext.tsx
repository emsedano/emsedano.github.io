import React, { useEffect } from 'react';
import { ProfileModel } from './ProfileModel';
import { getFirebase } from '../firebase/context';
import { ProfileService } from './ProfileService';
import { Subject, BehaviorSubject } from 'rxjs';

export interface ProfileStateModel {
  loading: boolean;
  loadingStatus?: string;
  profile?: ProfileModel;
}

const defaultProfileState: ProfileStateModel = {
  loading: false,
  profile: null,
  loadingStatus: 'Loading...',
};
export const ProfileContext = React.createContext<ProfileStateModel | null>(null);

function useProfile() {
  const context = React.useContext(ProfileContext);
  if (!context) {
    throw new Error(`useProfile must be used within a ProfileProvider`);
  }
  return context;
}

function ProfileProvider(props) {
  const [state, setState] = React.useState<ProfileStateModel>(defaultProfileState);
  const profileService = new ProfileService(getFirebase());
  const stateTracker = new Subject<ProfileStateModel>();

  if (!state.loading && state.profile == null) {
    profileService.fetchProfile().subscribe(state => stateTracker.next(state));
  }

  useEffect(() => {
    stateTracker.subscribe(setState);
  }, [state]);

  return <ProfileContext.Provider value={state} {...props} />;
}

export { ProfileProvider, useProfile };
