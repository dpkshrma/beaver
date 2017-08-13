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
        durationUnit: 'min',
        active: false
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
    const value = this.getTargetValue(target, this.state.projects);
    const task = Object.assign({}, this.state.task, { [target.name]: value });
    this.setState({ task });
  }

  getTargetValue = (target, selectMapping) => {
    let value = target.value;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else if (target.type === 'select-one' && selectMapping) {
      const key = target.getAttribute('data-key');
      if (key) {
        value = _.find(selectMapping, { [key]: value });
      }
    }
    return value;
  }

  onTaskSubmit = e => {
    e.preventDefault();
    TaskService.addTask(this.state.task).catch(e => { throw err; });
  }

  render() {
    console.log(this.state.task);
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
