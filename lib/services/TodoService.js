'use babel';

import db from '../helpers/db';

export default {
  getAllTodos() {
    return db.find();
  },
  addTodo(doc) {
    return db.insert(doc);
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
