'use babel';

import React from 'react';
import TaskFormContainer from './TaskForm';
import TaskListContainer from './TaskList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'taskList'
    };
  }
  render() {
    const { selectedPage } = this.state;
    return (
      <div id={this.props.id}>
        <atom-panel className="padded">
          <div className="panel-heading">
            <i className="icon icon-three-bars"></i>
            Add a task
          </div>
        </atom-panel>
        {selectedPage === 'taskForm' && <TaskFormContainer/>}
        {selectedPage === 'taskList' && <TaskListContainer/>}
      </div>
    );
  }
}

export default App;
