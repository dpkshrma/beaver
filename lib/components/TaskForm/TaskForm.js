'use babel';

import React from 'react';

const FormGroup = ({ children: { label, input: inputComponent } }) => (
  <atom-panel className='padded'>
    <div className="grd-input-label">{label}</div>
    <div className="padded">{inputComponent}</div>
  </atom-panel>
);

const TaskForm = ({ task, projects, onInputChange, onSubmit }) => {
  const { project, title, description, duration, durationUnit, active } = task;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        {{
          label: "Which project are you working on?",
          input: (
            <div>
              <select
                className="grd-input grd-input--projects input-select"
                value={project.path}
                name="project"
                onChange={onInputChange}
                data-key="path"
              >
                {
                  projects.map(({ path, name }) => (
                    <option key={path} value={path}>{name}</option>
                  ))
                }
              </select>
              { projects.length==0 ? <div className="text-info">Add a project first!</div> : null }
            </div>
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
              name="title"
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
              name="description"
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
                name="duration"
                min={1}
                onChange={onInputChange}
              />
              <select
                className="grd-input input-select"
                value={durationUnit}
                name="durationUnit"
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
          label: "Activate on submit?",
          input: (
            <label className="input-label">
              <input
                className="input-toggle"
                type="checkbox"
                name="active"
                checked={active}
                onChange={onInputChange}
              />
              {active?'yes':'no'}
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
              disabled={projects.length==0?true:false}
            />
          )
        }}
      </FormGroup>
    </form>
  );
};

export default TaskForm;
