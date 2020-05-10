import React from 'react';
import { Resume } from './resume/Resume';
import { FirebaseContext } from './firebase';
import { ProfileService, loadChildRefs } from './core/ProfileService';
import { take, delay, switchMap } from 'rxjs/operators';
import { Loader } from './loading/Loader';
import { ProfileContext } from './core/ProfileContext';
import { Footer } from './footer/Footer';

export class App extends React.Component {
  static contextType = FirebaseContext;
  private profileService: ProfileService;

  state = {
    loading: true,
    loadingStatus: 'Loading profile',
    profile: {},
  };

  componentDidMount() {
    // to give experience of loading only
    const randomWaitTime = () => Math.ceil(Math.random() * 900);

    this.profileService = new ProfileService(this.context);
    this.profileService.profile$
      .pipe(take(1))
      .pipe(
        delay(randomWaitTime()),
        switchMap(profile => {
          this.setState(state => ({ ...state, loadingStatus: 'Fetching Experience' }));
          return loadChildRefs(profile, 'experience');
        }),
        delay(randomWaitTime()),
        switchMap(profile => {
          this.setState(state => ({ ...state, loadingStatus: 'Fetching Articles' }));
          return loadChildRefs(profile, 'articles');
        }),
        delay(randomWaitTime()),
        switchMap(profile => {
          this.setState(state => ({ ...state, loadingStatus: 'Fetching Education' }));
          return loadChildRefs(profile, 'education');
        }),
        delay(randomWaitTime())
      )
      .subscribe(profile => this.setState({ loading: false, profile }));
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
