'use babel';

import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { Collapse } from 'react-collapse';

const TaskItem = ({ task, setTaskStatus, deleteTask, onTitleClick }) => {
  let onTaskCompleteStatus = 'active';
  let taskCompleteToggleClass = 'grd-task-item-action grd-task-item-check';
  if (task.status === 'active') {
    onTaskCompleteStatus = 'completed';
  }
  if (task.status === 'completed') {
    taskCompleteToggleClass += ' grd-task-item-check--complete';
  }
  const TaskCompleteToggle = (
    <button
      className={taskCompleteToggleClass}
      disabled={!task.status || task.status === 'inactive'}
      onClick={() => setTaskStatus(task._id, onTaskCompleteStatus)}
    >
      <i className="icon icon-check"></i>
    </button>
  );

  const taskDeadline = moment(task.createdAt).add(task.duration, task.durationUnit);
  const deadlineOffset = taskDeadline - Date.now();

  const taskTime = moment.duration(deadlineOffset).humanize();
  const taskTimeOffset = deadlineOffset>0 ? `${taskTime} left` : `${taskTime} overdue`;

  const TaskTimer = (
    <span
      className="grd-task-item-action"
      onClick={() => setTaskStatus(task._id, 'inactive')}
    >
      {taskTimeOffset}
    </span>
  );

  const TaskInactiveStatus = (
    <span
      className="grd-task-item-action"
      onClick={() => setTaskStatus(task._id, 'active')}
    >
      Inactive
    </span>
  );

  const TaskCompletedStatus = (
    <span className="grd-task-item-action">
      Completed {moment(_.max(task.completedAt)).fromNow()}
    </span>
  );

  return (
    <div className="grd-task-item padded">
      {TaskCompleteToggle}
      <div className="grd-task-item-content">
        <div className="grd-task-item-heading">
          <div
            className="grd-task-item-title"
            onClick={() => onTitleClick(task._id)}
          >
            {task.title}
          </div>
          <div className="grd-task-item-actions">
            <i className="grd-task-item-action icon icon-pencil"></i>
            <i
              className="grd-task-item-action icon icon-trashcan"
              onClick={() => deleteTask(task._id)}
            >
            </i>
          </div>
        </div>
        <div className="grd-task-item-info">
          <div className="text-subtle">
            <i className="icon icon-clock"></i>
            { task.status === 'active' ? TaskTimer : null }
            { task.status === 'inactive' ? TaskInactiveStatus : null}
            { task.status === 'completed' ? TaskCompletedStatus : null}
          </div>
          <div className="text-subtle">
            <i className="icon icon-repo"></i>
            <span>{task.project.name}</span>
          </div>
        </div>
        <Collapse isOpened={task.descOpen}>
          <div className="grd-task-item-description">{task.description}</div>
        </Collapse>
      </div>
    </div>
  );
};

export default TaskItem;
