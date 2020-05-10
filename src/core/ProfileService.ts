import Firebase from '../firebase';
import { from, forkJoin, Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { DataObject } from '../shared/model/DataObject';

export const loadChildRefs = (snapshot: DataObject, key: string) => {
  const childRefs$: Array<firebase.firestore.DocumentReference> = snapshot[key].map(snap => snap.get());
  return forkJoin(childRefs$).pipe(
    map((children: Array<firebase.firestore.DocumentSnapshot>) => ({
      ...snapshot,
      [key]: children.map(child => child.data()),
    }))
  );
};

export class ProfileService {
  constructor(private firebase: Firebase) {}

  get profile$() {
    const profileRef = this.firebase.firestore.collection('profile').doc('emsedano');
    return from(profileRef.get()).pipe(
      first(),
      map(snapshot => snapshot.data()),
      // switchMap(profile => {
      //   debugger;
      //   return of(profile)
      // }),
      tap(console.log)
    );
  }
}
