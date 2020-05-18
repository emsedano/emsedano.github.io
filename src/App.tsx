import React from 'react';
import { Resume } from './resume/Resume';
import { FirebaseContext } from './firebase';
import { ProfileService } from './core/ProfileService';
import { takeWhile } from 'rxjs/operators';
import { Loader } from './loading/Loader';
import { ProfileContext } from './core/ProfileContext';
import { Footer } from './footer/Footer';

export class App extends React.Component {
  static contextType = FirebaseContext;
  private profileService: ProfileService;

  state = {
    loading: true,
    loadingStatus: 'Loading Profile',
    profile: {},
  };

  componentDidMount() {
    // to give experience of loading only
    this.profileService = new ProfileService(this.context);

    this.profileService
      .fetchProfile()
      .pipe(takeWhile(() => this.state.loading))
      .subscribe(state => this.setState(state));
  }

  render() {
    const { profile, loading, loadingStatus } = this.state;

    const content = loading ? (
      <Loader text={loadingStatus} />
    ) : (
      <ProfileContext.Provider value={profile}>
        <Resume />
      </ProfileContext.Provider>
    );

    return (
      <div>
        <div className="container">{content}</div>
        <Footer />
      </div>
    );
  }
}
