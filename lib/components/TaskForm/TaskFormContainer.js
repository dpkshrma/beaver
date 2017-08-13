'use babel';

import _ from 'lodash';
import React from 'react';
import TaskForm from './TaskForm';
import { TaskService } from '../../services';

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        project: {},
        title: '',
        description: '',
        duration: 30,
        durationUnit: 'minutes',
        status: 'inactive'
      },
      projects: []
    };
  }

  componentWillMount() {
    this.updateProjectList(atom.project.getPaths());
    atom.project.onDidChangePaths(this.updateProjectList);
  }

  componentDidMount() {
    // select the first project
    this.selectProject(_.head(this.state.projects));
  }

  selectProject = project => {
    if (project) {
      this.setState({ task: Object.assign({}, this.state.task, { project }) });
    }
  }

  updateProjectList = paths => {
    const projects = paths.map(path => ({
      name: _.last(path.split('/')),
      path
    }));
    const { task: { project: selectedProject } } = this.state;
    // no projects present initially or selectet project is removed
    if (this.state.projects.length==0 || (selectedProject.length && !_.includes(paths, selectedProject))) {
      // select the first project
      this.selectProject(_.head(projects));
    }
    this.setState({ projects });
  }

  onInputChange = ({ target }) => {
    let value;
    if (target.name === 'project') {
      value = this.getTargetValue(target, { select: this.state.projects });
    } else if (target.name === 'status') {
      const mapping = [
        { value: 'active', state: true},
        { value: 'inactive', state: false }
      ];
      value = this.getTargetValue(target, { checkbox: mapping });
    } else {
      value = this.getTargetValue(target);
    }
    const task = Object.assign({}, this.state.task, { [target.name]: value });
    this.setState({ task });
  }

  getTargetValue = (target, mappings={}) => {
    let value = target.value;
    if (target.type === 'checkbox') {
      if (mappings.checkbox) {
        value = _.find(mappings.checkbox, { state: target.checked }).value;
      } else {
        value = target.checked;
      }
    } else if (target.type === 'select-one' && mappings.select) {
      const key = target.getAttribute('data-key');
      if (key) {
        value = _.find(mappings.select, { [key]: value });
      }
    }
    return value;
  }

  onTaskSubmit = e => {
    e.preventDefault();
    TaskService.addTask(this.state.task).catch(e => { throw err; });
  }

  render() {
    return (
      <TaskForm
        task={this.state.task}
        projects={this.state.projects}
        onInputChange={this.onInputChange}
        onSubmit={this.onTaskSubmit}
      />
    );
  }
}

export default TaskFormContainer;
