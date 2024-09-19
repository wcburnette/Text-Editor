import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Put request to database');
  const db = await openDB('jate', 1);
  await db.put('jate', { content });
};

export const getDb = async () => {
  console.log('Get request to database');
  const db = await openDB('jate', 1);
  const data = await db.getAll('jate');
  return data.length > 0 ? data[data.length - 1].content : '';
};

initdb();


