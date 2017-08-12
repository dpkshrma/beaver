'use babel';

import path from 'path';
import DataStore from 'nedb';

let dbInstance = null;
const defaultDBPath = path.join(__dirname, '../../grind.db');
const INIT_FIRST = 'Use db.configure to initialize the database first';

export default {
  configure(config={}) {
    const dBPath = config.dBPath || defaultDBPath;
    dbInstance = new DataStore({
      filename: config.dBPath || defaultDBPath,
      autoload: true
    });
    return this;
  },
  find(query) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      dbInstance.find(query, (err, docs) => {
        if (err) reject(err);
        resolve(docs);
      });
    });
  },
  insert(doc) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      dbInstance.insert(doc, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  }
};
