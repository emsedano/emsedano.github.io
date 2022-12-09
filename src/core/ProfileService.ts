import { from, Observable, of, concat } from 'rxjs';
import { map, shareReplay, take, concatMap, catchError, delay, tap } from 'rxjs/operators';
import { ProfileModel, Education, Experience, Articles } from './ProfileModel';
import { randomWaitTimeFactory } from '../shared/utils/randomWaitTime';
import {
  DocumentSnapshot,
  DocumentData,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  Query,
  orderBy,
  CollectionReference,
  QuerySnapshot,
} from 'firebase/firestore';
import Firebase from '../firebase';
import { Data } from '../shared/model/Data';

// random wait time generator
const randomWaitTime = randomWaitTimeFactory(900);

const fromSnapToData = <T>(snapshot: DocumentSnapshot<DocumentData>) => {
  return { id: snapshot.id, ...(snapshot.data() as T) };
};

const fromSnapsToData = <T>(snapshots: QuerySnapshot<DocumentData>) =>
  snapshots.docs.map(doc => fromSnapToData<T>(doc));

export class ProfileService {
  constructor(private firebase: Firebase) {}

  fetchProfile(): Observable<{ loading: boolean; loadingStatus?: string; profile?: ProfileModel }> {
    return new Observable(subscriber => {
      subscriber.next({ loading: true, loadingStatus: 'Fetching Profile' });

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

  private collection$(name: string) {
    return collection(this.firebase.firestore, name);
  }

  private getCollection(queryRef: CollectionReference<DocumentData> | Query<DocumentData>) {
    return from(getDocs(queryRef)).pipe(take(1), shareReplay());
  }

  private get profile$(): Observable<ProfileModel> {
    const profileRef = doc(this.firebase.firestore, 'profile', 'emsedano');
    return from(getDoc(profileRef)).pipe(take(1), map(fromSnapToData), shareReplay()) as Observable<ProfileModel>;
  }

  private get experience$(): Observable<Experience[]> {
    const experienceRefs$ = query(this.collection$('experience'), orderBy('startDate', 'desc'));
    return this.getCollection(experienceRefs$).pipe(map(snap => fromSnapsToData<Experience>(snap)));
  }

  private get education$(): Observable<Education[]> {
    const educationRefs$ = query(this.collection$('education'), orderBy('endDate', 'desc'));
    return this.getCollection(educationRefs$).pipe(map(snaps => fromSnapsToData<Education>(snaps)));
  }

  private get articles$(): Observable<Articles[]> {
    const articlesRefs$ = this.collection$('articles');
    return this.getCollection(articlesRefs$).pipe(map(snaps => fromSnapsToData<Articles>(snaps)));
  }
}
