'use babel';

import _ from 'lodash';
import React from 'react';
import TaskForm from './TaskForm';

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        project: '',
        title: '',
        description: '',
        duration: 30,
        durationUnit: 'min',
        isConcurrent: false
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
      this.setState({
        task: Object.assign(
          {},
          this.state.task,
          { project: _.get(project, 'path', '') }
        )
      });
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const task = Object.assign({}, this.state.task, { [target.name]: value });
    this.setState({ task });
  }

  onTaskSubmit = e => {
    this.props.onTaskSubmit(this.state.task);
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
