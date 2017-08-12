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
  componentDidMount() {
    TaskService
      .getAllTasks()
      .then((tasks=[]) => this.setState({ tasks }))
      .catch(err => { throw err; });
  }
  onTaskSubmit = task => {
    console.log(task, this.state);
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
