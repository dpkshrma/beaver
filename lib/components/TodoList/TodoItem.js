'use babel';

import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { Collapse } from 'react-collapse';

const TodoItem = ({ todo, setTodoStatus, deleteTodo, onTitleClick }) => {
  if (!todo.descOpen) {
    todo.descOpen = false;
  }

  let onTodoCompleteStatus = 'active';
  let todoCompleteToggleClass = 'grd-todo-item-action grd-todo-item-check';
  if (todo.status === 'active') {
    onTodoCompleteStatus = 'completed';
  }
  if (todo.status === 'completed') {
    todoCompleteToggleClass += ' grd-todo-item-check--complete';
  }
  const TodoCompleteToggle = (
    <button
      className={todoCompleteToggleClass}
      disabled={!todo.status || todo.status === 'inactive'}
      onClick={() => setTodoStatus(todo._id, onTodoCompleteStatus)}
    >
      <i className="icon icon-check"></i>
    </button>
  );

  const todoDeadline = moment(todo.createdAt).add(todo.duration, todo.durationUnit);
  const deadlineOffset = todoDeadline - Date.now();

  const todoTime = moment.duration(deadlineOffset).humanize();
  const todoTimeOffset = deadlineOffset>0 ? `${todoTime} left` : `${todoTime} overdue`;

  const TodoTimer = (
    <span
      className="grd-todo-item-action"
      onClick={() => setTodoStatus(todo._id, 'inactive')}
    >
      {todoTimeOffset}
    </span>
  );

  const TodoInactiveStatus = (
    <span
      className="grd-todo-item-action"
      onClick={() => setTodoStatus(todo._id, 'active')}
    >
      Inactive
    </span>
  );

  const TodoCompletedStatus = (
    <span className="grd-todo-item-action">
      Completed {moment(_.max(todo.completedAt)).fromNow()}
    </span>
  );

  return (
    <div className="grd-todo-item padded">
      {TodoCompleteToggle}
      <div className="grd-todo-item-content">
        <div className="grd-todo-item-heading">
          <div
            className="grd-todo-item-title"
            onClick={() => onTitleClick(todo._id)}
          >
            {todo.title}
          </div>
          <div className="grd-todo-item-actions">
            <i className="grd-todo-item-action icon icon-pencil"></i>
            <i
              className="grd-todo-item-action icon icon-trashcan"
              onClick={() => deleteTodo(todo._id)}
            >
            </i>
          </div>
        </div>
        <div className="grd-todo-item-info">
          <div className="text-subtle">
            <i className="icon icon-clock"></i>
            { todo.status === 'active' ? TodoTimer : null }
            { todo.status === 'inactive' ? TodoInactiveStatus : null}
            { todo.status === 'completed' ? TodoCompletedStatus : null}
          </div>
          <div className="text-subtle">
            <i className="icon icon-repo"></i>
            <span>{todo.project.name}</span>
          </div>
        </div>
        <Collapse isOpened={todo.descOpen}>
          <div className="grd-todo-item-description">{todo.description}</div>
        </Collapse>
      </div>
    </div>
  );
};

export default TodoItem;
