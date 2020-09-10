import Firebase from '../firebase';
import { from, Observable, of } from 'rxjs';
import { map, shareReplay, take, concatMap, catchError, delay } from 'rxjs/operators';
import { ProfileModel, Education, Experience, Articles } from './ProfileModel';
import { randomWaitTimeFactory } from '../shared/utils/randomWaitTime';

// random wait time generator
const randomWaitTime = randomWaitTimeFactory(900);

const fromSnapToData = <T>(snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) =>
  snapshot.data() as T;

const fromSnapsToData = <T>(snapshots: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) =>
  snapshots.docs.map(doc => fromSnapToData<T>(doc));

export class ProfileService {
  constructor(private firebase: Firebase) {}

  private collection$(name: string) {
    return this.firebase.firestore.collection(name);
  }

  private getCollection(queryRef: firebase.firestore.Query<firebase.firestore.DocumentData>) {
    return from(queryRef.get()).pipe(take(1), shareReplay());
  }

  private get profile$(): Observable<ProfileModel> {
    const profileRef = this.firebase.firestore.collection('profile').doc('emsedano');
    return from(profileRef.get()).pipe(take(1), map(fromSnapToData), shareReplay()) as Observable<ProfileModel>;
  }

  private get experience$(): Observable<Experience[]> {
    const experienceRefs$ = this.collection$('experience').orderBy('startDate', 'desc');
    return this.getCollection(experienceRefs$).pipe(map(snapshots => fromSnapsToData<Experience>(snapshots)));
  }

  private get education$(): Observable<Education[]> {
    const educationRefs$ = this.collection$('education').orderBy('endDate', 'desc');
    return this.getCollection(educationRefs$).pipe(map(snapshots => fromSnapsToData<Education>(snapshots)));
  }

  private get articles$(): Observable<Articles[]> {
    const articlesRefs$ = this.collection$('articles');
    return this.getCollection(articlesRefs$).pipe(map(snapshots => fromSnapsToData<Articles>(snapshots)));
  }

  fetchProfile(): Observable<{ loading: boolean; loadingStatus?: string; profile?: ProfileModel }> {
    return new Observable(subscriber => {
      this.profile$
        .pipe(
          take(1),
          // fetch experience
          delay(randomWaitTime()),
          concatMap(profile => {
            subscriber.next({ loading: true, loadingStatus: 'Fetching Experience' });
            return this.experience$.pipe(map(experience => ({ ...profile, experience })));
          }),
          // fetch education
          delay(randomWaitTime()),
          concatMap(profile => {
            subscriber.next({ loading: true, loadingStatus: 'Fetching Education' });
            return this.education$.pipe(map(education => ({ ...profile, education })));
          }),
          // fetch articles
          delay(randomWaitTime()),
          concatMap(profile => {
            subscriber.next({ loading: true, loadingStatus: 'Fetching Articles' });
            return this.articles$.pipe(map(articles => ({ ...profile, articles })));
          }),
          delay(randomWaitTime()),
          // finally return profile
          map((profile: ProfileModel) => {
            subscriber.next({ loading: false, profile });
          }),
          catchError(() => of({ loading: false, loadingStatus: 'Error' }))
        )
        .subscribe(() => subscriber.complete());
    });
  }
}
