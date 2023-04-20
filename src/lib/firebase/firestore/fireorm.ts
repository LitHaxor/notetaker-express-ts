import firestore from 'firebase/firestore';
import db from './firestore';
import { collection, doc, setDoc, query, where } from 'firebase/firestore';

interface FirestoreModel<T> {
  id: string;
  data: T;
}

// Create a reusable ORM class for all models
export class FirestoreORM<T> {
  private collection: firestore.CollectionReference;

  constructor(collectionName: string) {
    this.collection = collection(db, collectionName);
  }

  // Create a new document
  async create(id: string, data: T): Promise<void> {
    try {
      await setDoc(doc(this.collection, id), data);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Get a document by ID
  async getById(id: string): Promise<FirestoreModel<T> | null> {
    const snapshot = await this.collection.doc(id).get();
    if (snapshot.exists) {
      return { id: snapshot.id, data: snapshot.data() as T };
    } else {
      return null;
    }
  }

  // Update a document by ID
  async update(id: string, data: Partial<T>): Promise<void> {
    await this.collection.doc(id).update(data);
  }

  // Delete a document by ID
  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
