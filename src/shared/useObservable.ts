import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = (observable: Observable<any>): any => {
  const [state, setState] = useState();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    // cleanup
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};
