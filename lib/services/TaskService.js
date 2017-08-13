'use babel';

import db from '../helpers/db';

export default {
  getAllTasks() {
    return db.find();
  },
  addTask(doc) {
    return db.insert(doc);
  },
  setTaskStatus(taskId, status) {
    const query = { _id: taskId };
    const update = { $set: { status } };

    if (status === 'active' ) {
      update.$addToSet = { activatedAt: Date.now() };
    } else if (status === 'inactive') {
      update.$addToSet = { deactivatedAt: Date.now() };
    } else if (status === 'completed') {
      update.$addToSet = { completedAt: Date.now() };
    }

    return db.updateOne(query, update);
  },
  deleteTask(taskId) {
    return db.remove({ _id: taskId });
  }
};
