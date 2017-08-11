'use babel';

import PouchDB from 'pouchdb';
import { dbConfig } from '../config';

let dbInstance = null;

class GrindDB {
  constructor(config={}) {
    if (!dbInstance) {
      const { name='test' } = config;
      dbInstance = new PouchDB(name);
    }
  }
  get db() {
    return dbInstance;
  }
}

export default new GrindDB(dbConfig);
