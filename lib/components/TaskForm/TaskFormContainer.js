'use babel';

import React from 'react';
import TaskForm from './TaskForm';

class TaskFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: '',
      title: '',
      description: '',
      duration: 30,
      durationUnit: 'min',
      isConcurrent: false
    };
  }
  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  }
  onTaskSubmit = e => {
    this.props.onTaskSubmit(this.state);
  }
  render() {
    return (
      <TaskForm
        project={this.state.project}
        title={this.state.title}
        description={this.state.description}
        duration={this.state.duration}
        durationUnit={this.state.durationUnit}
        isConcurrent={this.state.isConcurrent}
        onInputChange={this.onInputChange}
        onSubmit={this.onTaskSubmit}
      />
    );
  }
}

export default TaskFormContainer;
