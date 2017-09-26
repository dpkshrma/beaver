'use babel';

import React from 'react';

const TodoListActions = ({ listFilter, changeListFilter }) => {
  const filterStatus = {
    all: listFilter === 'all' ? '' : 'inactive',
    pending: listFilter === 'pending' ? '' : 'inactive',
    completed: listFilter === 'completed' ? '' : 'inactive'
  };
  return (
    <div className="block todo-list-actions">
      <div
        className={`badge todo-list-actions__item ${filterStatus.all}`}
        onClick={() => changeListFilter('all')}
      >
        All
      </div>
      <div
        className={`badge todo-list-actions__item ${filterStatus.pending}`}
        onClick={() => changeListFilter('pending')}
      >
        Pending
      </div>
      <div
        className={`badge todo-list-actions__item ${filterStatus.completed}`}
        onClick={() => changeListFilter('completed')}
      >
        Completed
      </div>
    </div>
  );
};

export default TodoListActions;
