import Firebase from '../firebase';
import {
  doc,
  updateDoc,
  UpdateData,
  addDoc,
  collection,
  DocumentReference,
  WithFieldValue,
  deleteDoc,
} from 'firebase/firestore';

export interface DocumentRepository<T> {
  add(docType: string, data: WithFieldValue<T>): Promise<DocumentReference<T>>;
  update(docType: string, id: string, Data: UpdateData<T>): Promise<void>;
  delete(docType: string, id: string): Promise<void>;
}

export class DocumentRepositoryService<T> implements DocumentRepository<T> {
  constructor(private firebase: Firebase) {}

  private get db() {
    return this.firebase.firestore;
  }

  async add(docType: string, data: WithFieldValue<T>): Promise<DocumentReference<T>> {
    return addDoc<T>(collection(this.db, docType) as any, data);
  }

  async update(docType: string, id: string, data: UpdateData<T>): Promise<void> {
    const docRef = doc(this.db, docType, id);
    return updateDoc(docRef, data);
  }

  delete(docType: string, id: string): Promise<void> {
    const noteRef = doc(this.db, docType, id);
    return deleteDoc(noteRef);
  }
}
