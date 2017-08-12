'use babel';

import React from 'react';

const FormGroup = ({ children: { label, input: inputComponent } }) => (
  <atom-panel className='padded'>
    <div className="grd-input-label">{label}</div>
    <div className="padded">{inputComponent}</div>
  </atom-panel>
);

const TaskForm = ({ project, title, description, duration, durationUnit, isConcurrent, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        {{
          label: "Which project are you working on?",
          input: (
            <select
              className="grd-input input-select"
              value={project}
              name="taskProject"
              onChange={onInputChange}
            >
              <option selected>grind</option>
              <option>simple-activity-tracker</option>
            </select>
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: "What are you working on?",
          input: (
            <input
              className="grd-input input-text native-key-bindings"
              value={title}
              type="text"
              name="taskTitle"
              onChange={onInputChange}
            />
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: "How will you do it?",
          input: (
            <textarea
              className="grd-input input-textarea native-key-bindings"
              value={description}
              type="text"
              name="taskDescription"
              onChange={onInputChange}
            />
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: "How much time do you need?",
          input: (
            <div className="grd-horizontal-list">
              <input
                className="grd-input input-text native-key-bindings"
                value={duration}
                type="number"
                name="taskDuration"
                onChange={onInputChange}
              />
              <select
                className="grd-input input-select"
                value={durationUnit}
                name="taskDurationUnit"
                onChange={onInputChange}
              >
                <option value="min">min</option>
                <option value="hr">hr</option>
                <option value="day">day</option>
                <option value="week">week</option>
              </select>
            </div>
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          label: "Is it concurrent?",
          input: (
            <label className="input-label">
              <input
                className="input-toggle"
                type="checkbox"
                name="taskIsConcurrent"
                checked={isConcurrent}
                onChange={onInputChange}
              />
              {isConcurrent?'yes':'no'}
            </label>
          )
        }}
      </FormGroup>
      <FormGroup>
        {{
          input: (
            <input
              className="grd-input btn btn-primary"
              type="submit"
              value="Submit"
            />
          )
        }}
      </FormGroup>
    </form>
  );
};

export default TaskForm;
