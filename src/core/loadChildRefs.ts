import { Data } from '../shared/model/Data';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentReference, DocumentSnapshot } from 'firebase/firestore';

/**
 * Fetches refs data for each ref item
 * @param snapshot
 * @param key
 */
export const loadChildRefs = (snapshot: Data, key: string) => {
  const childRefs$: Array<DocumentReference> = snapshot[key].map(snap => snap.get());
  return forkJoin(childRefs$).pipe(
    map((children: Array<DocumentSnapshot>) => ({
      ...snapshot,
      [key]: children.map(child => child.data()),
    }))
  );
};
