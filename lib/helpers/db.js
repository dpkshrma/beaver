'use babel';

import path from 'path';
import DataStore from 'nedb';

let dbInstance = null;
const defaultDBPath = path.join(__dirname, '../../beaver.db');
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
  find(query, returnCursor=false) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      if (returnCursor) {
        resolve(dbInstance.find(query));
      } else {
        dbInstance.find(query, (err, docs) => {
          if (err) reject(err);
          resolve(docs);
        });
      }
    });
  },
  insert(doc) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      doc.createdAt = Date.now();
      dbInstance.insert(doc, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  updateOne(query, update, options={}) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      const queryOptions = Object.assign({}, options, { returnUpdatedDocs: true });
      dbInstance.update(query, update, queryOptions, (err, numDocs, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  updateMany(query, update, options={}) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      const queryOptions = Object.assign({}, options, { returnUpdatedDocs: true, multi: true });
      dbInstance.update(query, update, queryOptions, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      });
    });
  },
  remove(query, options={}) {
    return new Promise((resolve, reject) => {
      if (!dbInstance) reject(INIT_FIRST);
      dbInstance.remove(query, options, (err, numRemoved) => {
        if (err) reject(err);
        resolve(numRemoved);
      });
    });
  }
};
