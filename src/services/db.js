import { openDB } from 'idb';

const DB_NAME = 'ZeroCloud';
const STORE_NAME = 'notes';
const DB_VERSION = 1;

let dbPromise = null;
function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllNotes() {
  const db = await getDb();
  return db.getAll(STORE_NAME);
}

export async function saveNote(note) {
  const db = await getDb();
  // if note.id exists, it updates; otherwise autoIncrements
  return db.put(STORE_NAME, note);
}

export async function deleteNote(id) {
  const db = await getDb();
  return db.delete(STORE_NAME, id);
}
