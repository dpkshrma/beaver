'use babel';

import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTaskStatus, deleteTask, onTitleClick }) => {
  return (
    <div>
      {
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            setTaskStatus={setTaskStatus}
            deleteTask={deleteTask}
            onTitleClick={onTitleClick}
          />
        ))
      }
    </div>
  );
};

export default TaskList;
