import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

import { Authenticate } from '../login/Authenticate';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export class Firebase {
  private db: Firestore;
  private _authenticateService: {
    signIn(email: string, pwd: string): Promise<any>;
    logOut(): Promise<any>;
    auth: Auth;
  };

  constructor() {
    const app = initializeApp(firebaseConfig);

    this.db = getFirestore(app);

    this._authenticateService = Authenticate(getAuth(app));
  }

  public get firestore() {
    return this.db;
  }

  public get authService() {
    return this._authenticateService;
  }
}
