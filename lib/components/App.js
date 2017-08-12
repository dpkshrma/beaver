'use babel';

import React from 'react';
import TaskFormContainer from './TaskForm';
import TaskService from '../services/TaskService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  componentWillMount() {
    TaskService
      .getAllTasks()
      .then((tasks=[]) => this.setState({ tasks }))
      .catch(err => { throw err; });
  }
  onTaskSubmit = task => {
    TaskService
      .addTask(task)
      .then(() => this.setState({ tasks: [...this.state.tasks, task]}))
      .catch(e => { throw err; });
  }
  render() {
    const { id, text } = this.props;
    return (
      <div id={id}>
        <atom-panel className="padded">
          <div className="panel-heading">
            <i className="icon icon-three-bars"></i>
            Add a task
          </div>
        </atom-panel>
        <TaskFormContainer onTaskSubmit={this.onTaskSubmit} />
      </div>
    );
  }
}

export default App;
