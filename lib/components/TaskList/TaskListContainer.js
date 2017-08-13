'use babel';

import _ from 'lodash';
import React from 'react';
import TaskList from './TaskList';
import { TaskService } from '../../services';

class TaskListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  setTaskStatus = (taskId, status) => {
    TaskService
      .setTaskStatus(taskId, status)
      .then(updatedTask => {
        this.setState({
          tasks: [
            ...this.state.tasks.filter(task => task._id != updatedTask._id),
            updatedTask
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  deleteTask = taskId => {
    TaskService
      .deleteTask(taskId)
      .then(() => {
        this.setState({
          tasks: this.state.tasks.filter(task => task._id != taskId)
        });
      })
      .catch(err => {
        throw err;
      });
  }
  onTitleClick = taskId => {
    const { tasks } = this.state;
    const clickedTask = _.find(tasks, { _id: taskId });

    let descOpen = true;
    if (clickedTask && clickedTask.descOpen) {
      descOpen = false;
    }

    this.setState({
      tasks: [
        ...tasks.filter(task => task._id != taskId),
        Object.assign({}, clickedTask, { descOpen })
      ]
    });
  }
  componentWillMount() {
    TaskService
      .getAllTasks()
      .then((tasks=[]) => this.setState({ tasks }))
      .catch(err => {
        throw err;
      });
  }
  render() {
    const taskList = (
      <TaskList
        tasks={this.state.tasks}
        setTaskStatus={this.setTaskStatus}
        deleteTask={this.deleteTask}
        onTitleClick={this.onTitleClick}
      />
    );
    return taskList;
  }
}

export default TaskListContainer;
