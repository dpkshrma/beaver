'use babel';

import React from 'react';
import TodoItem from './TodoItem';

const TodoListBackgroundMessage = () => (
  <background-tips>
    <ul className="centered background-message">
      <li className="message fade-in">
        Newly added todos will be listed here
      </li>
    </ul>
  </background-tips>
);

const TodoList = ({ todos, setTodoStatus, deleteTodo, onTitleClick }) => {
  return (
    <div>
      {
        _.sortBy(todos, ['createdAt']).map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            setTodoStatus={setTodoStatus}
            deleteTodo={deleteTodo}
            onTitleClick={onTitleClick}
          />
        ))
      }
      { (!todos || todos.length==0) && <TodoListBackgroundMessage /> }
    </div>
  );
};

export default TodoList;
