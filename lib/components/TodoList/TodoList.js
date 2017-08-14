'use babel';

import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodoStatus, deleteTodo, onTitleClick }) => {
  return (
    <div>
      {
        todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            setTodoStatus={setTodoStatus}
            deleteTodo={deleteTodo}
            onTitleClick={onTitleClick}
          />
        ))
      }
    </div>
  );
};

export default TodoList;
