'use babel';

import _ from 'lodash';
import React from 'react';
import TodoForm from './TodoForm';
import { TodoService } from '../../services';

class TodoFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        project: {},
        title: 'something',
        description: 'somehow',
        duration: 1,
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
      this.setState({ todo: Object.assign({}, this.state.todo, { project }) });
    }
  }

  updateProjectList = paths => {
    const projects = paths.map(path => ({
      name: _.last(path.split('/')),
      path
    }));
    const { todo: { project: selectedProject } } = this.state;
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
    const todo = Object.assign({}, this.state.todo, { [target.name]: value });
    this.setState({ todo });
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

  onTodoSubmit = e => {
    e.preventDefault();
    const { todo } = this.state;
    TodoService
      .addTodo(todo)
      .then(newTodo => {
        if (newTodo.status === 'active') {
          TodoService
            .setTodoStatus(newTodo._id, 'active')
            .catch(e => { throw err; });
        }
      })
      .catch(e => { throw err; });
  }

  render() {
    return (
      <TodoForm
        todo={this.state.todo}
        projects={this.state.projects}
        onInputChange={this.onInputChange}
        onSubmit={this.onTodoSubmit}
      />
    );
  }
}

export default TodoFormContainer;
