'use babel';

import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { UnmountClosed } from 'react-collapse';

const TodoCompleteToggle = ({ _id, status, setTodoStatus }) => {
  let onTodoCompleteStatus = 'active';
  let todoCompleteToggleClass = 'todo-item-action todo-item-check';
  if (status === 'active') {
    onTodoCompleteStatus = 'completed';
  }
  if (status === 'completed') {
    todoCompleteToggleClass += ' todo-item-check--complete';
  }
  return (
    <button
      className={todoCompleteToggleClass}
      disabled={!status || status === 'inactive'}
      onClick={() => setTodoStatus(_id, onTodoCompleteStatus)}
    >
      <i className="icon icon-check"></i>
    </button>
  );
};

const TodoTimer = ({ timeTillDeadline, deactivateTodo }) => {
  const todoTime = moment.duration(timeTillDeadline).humanize();
  const todoTimeOffset = timeTillDeadline>0 ? `${todoTime} left` : `${todoTime} overdue`;
  return (
    <span className="todo-item-action" onClick={deactivateTodo}>
      {todoTimeOffset}
    </span>
  );
};

const TodoInactiveStatus = ({ activateTodo }) => (
  <span className="todo-item-action" onClick={activateTodo}>
    Inactive
  </span>
);

const TodoCompletedStatus = ({ completedAt }) => (
  <span className="todo-item-action">
    Completed {moment(_.max(completedAt)).fromNow()}
  </span>
);

const TodoItem = props => {
  const {
    _id,
    status,
    title,
    description,
    project,
    descOpen=false,
    completedAt,
    setTodoStatus,
    deleteTodo,
    onTitleClick,
    updateTimeTillDeadline,
    timeTillDeadline
  } = props;

  const deactivateTodo = () => setTodoStatus(_id, 'inactive');
  const activateTodo = () => setTodoStatus(_id, 'active');

  return (
    <div className="todo-item padded">
      <TodoCompleteToggle
        _id={_id}
        status={status}
        setTodoStatus={setTodoStatus}
      />
      <div className="todo-item-content">
        <div className="todo-item-heading">
          <div
            className="todo-item-title"
            onClick={() => onTitleClick(_id)}
          >
            {title}
          </div>
          <div className="todo-item-actions">
            <i className="todo-item-action icon icon-pencil"></i>
            <i
              className="todo-item-action icon icon-trashcan"
              onClick={() => deleteTodo(_id)}
            >
            </i>
          </div>
        </div>
        <div className="todo-item-info">
          <div className="text-subtle">
            <i className="icon icon-clock"></i>
            { status === 'active' ? <TodoTimer deactivateTodo={deactivateTodo} timeTillDeadline={timeTillDeadline} /> : null }
            { status === 'inactive' ? <TodoInactiveStatus activateTodo={activateTodo} /> : null }
            { status === 'completed' ? <TodoCompletedStatus completedAt={completedAt} /> : null }
          </div>
          <div className="text-subtle">
            <i className="icon icon-repo"></i>
            <span>{project.name}</span>
          </div>
        </div>
        <UnmountClosed isOpened={descOpen}>
          <div className="todo-item-description">{description}</div>
        </UnmountClosed>
      </div>
    </div>
  );
};

export default TodoItem;
