'use babel';

import React from 'react';
import TaskForm from './TaskForm';
import { db } from '../helpers/db';

console.log(db)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
    this.getAllTasks();
  }
  getAllTasks = () => {
    db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
      if (err) {
        console.error(err);
      }
      console.log(doc);
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
