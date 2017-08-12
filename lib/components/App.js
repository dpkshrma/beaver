'use babel';

import React from 'react';
import TaskForm from './TaskForm';
import TaskService from '../services/TaskService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskProject: '',
      taskTitle: '',
      taskDuration: 30,
      taskDurationUnit: 'min',
      taskDescription: ''
    };
  }
  componentDidMount() {
    TaskService
      .getAllTasks()
      .then((tasks=[]) => this.setState({ tasks }))
      .catch(err => { throw err; });
  }
  onTaskInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  }
  onTaskSubmit = () => {
    console.log(this.state);
  }
  render() {
    const { id, text } = this.props;
    return (
      <div id={id}>
        <atom-panel className="padded">
            <div className="inset-panel">
                <div className="panel-heading">
                  <div>
                    <i className="icon icon-three-bars"></i>
                    Add a task
                  </div>
                </div>
            </div>
        </atom-panel>
        <TaskForm
          project={this.state.taskProject}
          title={this.state.taskTitle}
          description={this.state.taskDescription}
          duration={this.state.taskDuration}
          durationUnit={this.state.taskDurationUnit}
          isConcurrent={this.state.taskIsConcurrent}
          onInputChange={this.onTaskInputChange}
          onSubmit={this.onTaskSubmit}
        />
      </div>
    );
  }
}

export default App;
