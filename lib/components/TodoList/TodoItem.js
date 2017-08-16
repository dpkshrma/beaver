'use babel';

import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { Collapse } from 'react-collapse';

const TodoCompleteToggle = ({ todo, setTodoStatus }) => {
  let onTodoCompleteStatus = 'active';
  let todoCompleteToggleClass = 'grd-todo-item-action grd-todo-item-check';
  if (todo.status === 'active') {
    onTodoCompleteStatus = 'completed';
  }
  if (todo.status === 'completed') {
    todoCompleteToggleClass += ' grd-todo-item-check--complete';
  }
  return (
    <button
      className={todoCompleteToggleClass}
      disabled={!todo.status || todo.status === 'inactive'}
      onClick={() => setTodoStatus(todo._id, onTodoCompleteStatus)}
    >
      <i className="icon icon-check"></i>
    </button>
  );
};

/**
 * Returns total time in ms that a todo has been active
 * @param  {Array} timestamps All active/inactive timestamps in alternate order starting with active timestamp
 * @param  {String} todoStatus todo status (active/inactive/completed)
 * @return {Number}            Total amount of time that todo remained active
 */
const getTodoActiveTime = (timestamps, todoStatus) => {
  let totalActiveTime = 0;
  // flag to skip alternate cycles of reduce so that ts1 = activatedAt, ts2=deactivatedAt timestamp
  let isActiveTimestamp = true;
  _.reduce(_.sortBy(timestamps), (ts1, ts2) => {
    if (isActiveTimestamp) {
      totalActiveTime += (ts2-ts1);
    }
    isActiveTimestamp = !isActiveTimestamp;
    return ts2;
  });
  // also add active time of todo till now
  if (todoStatus === 'active') {
    const lastActivatedOn = _.last(_.sortBy(timestamps));
    totalActiveTime+=(Date.now()-lastActivatedOn);
  }
  return totalActiveTime;
};

const TodoTimer = ({ todo, deactivateTodo }) => {
  const { duration, durationUnit, activatedAt=[], deactivatedAt=[] } = todo;

  const totalActiveTime = getTodoActiveTime(_.concat(activatedAt, deactivatedAt), todo.status);
  const timeTillDeadline = moment.duration(duration, durationUnit).valueOf()-totalActiveTime;

  const todoTime = moment.duration(timeTillDeadline).humanize();
  const todoTimeOffset = timeTillDeadline>0 ? `${todoTime} left` : `${todoTime} overdue`;

  return (
    <span className="grd-todo-item-action" onClick={deactivateTodo}>
      {todoTimeOffset}
    </span>
  );
};

const TodoInactiveStatus = ({ activateTodo }) => (
  <span className="grd-todo-item-action" onClick={activateTodo}>
    Inactive
  </span>
);

const TodoCompletedStatus = ({ todo }) => (
  <span className="grd-todo-item-action">
    Completed {moment(_.max(todo.completedAt)).fromNow()}
  </span>
);

const TodoItem = ({ todo, setTodoStatus, deleteTodo, onTitleClick }) => {
  // set default value for todo description collapse state
  if (!todo.descOpen) {
    todo.descOpen = false;
  }

  const deactivateTodo = () => setTodoStatus(todo._id, 'inactive');
  const activateTodo = () => setTodoStatus(todo._id, 'active');

  return (
    <div className="grd-todo-item padded">
      <TodoCompleteToggle
        todo={todo}
        setTodoStatus={setTodoStatus}
      />
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
            { todo.status === 'active' ? <TodoTimer todo={todo} deactivateTodo={deactivateTodo} /> : null }
            { todo.status === 'inactive' ? <TodoInactiveStatus activateTodo={activateTodo} /> : null }
            { todo.status === 'completed' ? <TodoCompletedStatus todo={todo} /> : null }
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
