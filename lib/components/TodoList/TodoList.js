'use babel';

import React from 'react';
import _ from 'lodash';
import TodoItemContainer from './TodoItemContainer';

const TodoListBackgroundMessage = () => (
  <background-tips>
    <ul className="centered background-message">
      <li className="message fade-in">
        Newly added todos will be listed here
      </li>
    </ul>
  </background-tips>
);

const TodoListActions = ({ listFilter, changeListFilter }) => {
  const filterStatus = {
    all: listFilter==='all' ? '' : 'inactive',
    pending: listFilter==='pending' ? '' : 'inactive',
    completed: listFilter==='completed' ? '' : 'inactive'
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

const TodoList = ({ todos, setTodoStatus, deleteTodo, onTitleClick, listFilter, changeListFilter }) => {
  const filteredTodos = _.filter(todos, todo => {
    if (listFilter==='all') {
      return true;
    } else if (listFilter==='completed') {
      return todo.status==='completed';
    } else if (listFilter==='pending') {
      return todo.status!='completed';
    }
  })
  return (
    <div>
      <TodoListActions listFilter={listFilter} changeListFilter={changeListFilter} />
      <div className="todo-list">
        {
          _.sortBy(filteredTodos, ['createdAt']).map(todo => (
            <TodoItemContainer
              key={todo._id}
              todo={todo}
              setTodoStatus={setTodoStatus}
              deleteTodo={deleteTodo}
              onTitleClick={onTitleClick}
            />
          ))
        }
      </div>
      { (!todos || todos.length==0) && <TodoListBackgroundMessage /> }
    </div>
  );
};

export default TodoList;
