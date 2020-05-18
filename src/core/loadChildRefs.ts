import { DataObject } from '../shared/model/DataObject';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Fetches refs data for each ref item
 * @param snapshot
 * @param key
 */
export const loadChildRefs = (snapshot: DataObject, key: string) => {
  const childRefs$: Array<firebase.firestore.DocumentReference> = snapshot[key].map(snap => snap.get());
  return forkJoin(childRefs$).pipe(
    map((children: Array<firebase.firestore.DocumentSnapshot>) => ({
      ...snapshot,
      [key]: children.map(child => child.data()),
    }))
  );
};
