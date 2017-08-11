'use babel';

import React from 'react';

const TaskForm = ({ task, onTaskInputChange, onTaskSubmit }) => {
  return (
    <form onSubmit={onTaskSubmit}>
      <input
        className="input-text native-key-bindings"
        value={task}
        type="text"
        onChange={onTaskInputChange}
      />
      <input
        className="btn btn-primary"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default TaskForm;
