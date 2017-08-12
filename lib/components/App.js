'use babel';

import React from 'react';
import TaskForm from './TaskForm';
import TaskService from '../services/TaskService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
    TaskService
      .getAllTasks()
      .then(docs => {
        console.log(docs);
      });
  }
  onTaskSubmit = () => {
    console.log(this.state.task);
  }
  onTaskInputChange = e => {
    this.setState({ task: e.target.value });
  }
  render() {
    const { id, text } = this.props;
    return (
      <div id={id}>
        <TaskForm
          onTaskInputChange={this.onTaskInputChange}
          onTaskSubmit={this.onTaskSubmit}
        />
      </div>
    );
  }
}

export default App;
