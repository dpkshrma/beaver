'use babel';

import db from '../helpers/db';

export default {
  getAllTasks() {
    return db.find();
  },
  addTask(doc) {
    return db.insert(doc);
  }
};
