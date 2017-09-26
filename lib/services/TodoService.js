'use babel';

import _ from 'lodash';
import db from '../helpers/db';

export default {
  getAllTodos() {
    return db.find();
  },
  getTodo(todoId) {
    return db.findOne({ _id: todoId });
  },
  addTodo(doc) {
    return new Promise((resolve, reject) => {
      db.find({}, true)
        .then(cursor => {
          cursor
            .sort({ idx: -1 })
            .limit(1)
            .exec((err, [lastDoc]) => {
              if (err) reject(err);
              doc.idx = _.get(lastDoc, 'idx' , -1) + 1;
              return resolve(db.insert(doc));
            });
        })
        .catch(reject);
    });
  },
  updateTodo(todo) {
    if (!todo._id) {
      Promise.reject('Todo _id required for update');
    }
    return db.updateOne({ _id: todo._id }, todo);
  },
  reorderTodo(todoId, idx) {
    return db.updateOne({ _id: todoId }, { $set: { idx } });
  },
  setTodoStatus(todoId, status) {
    const query = { _id: todoId };
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
  deleteTodo(todoId) {
    return db.remove({ _id: todoId });
  }
};
