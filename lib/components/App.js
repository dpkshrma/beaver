'use babel';

import React from 'react';
import { Collapse } from 'react-collapse';
import TaskFormContainer from './TaskForm';
import TaskListContainer from './TaskList';

const TopBar = ({ children, toggleTopMenu, selectedPage }) => (
  <atom-panel className="padded">
    <div className="panel-heading top-menu-button">
      <i
        className="icon icon-three-bars"
        onClick={toggleTopMenu}
      >
      </i>
      {selectedPage==='taskForm' ? 'Add a task': null}
      {selectedPage==='taskList' ? 'Task List': null}
    </div>
    {children}
  </atom-panel>
);

const TopMenu = ({ topMenuVisible, onTopMenuItemClick }) => (
  <div className="panel-body top-menu">
    <Collapse isOpened={topMenuVisible}>
      <div
        className="top-menu-item"
        onClick={onTopMenuItemClick}
        data-page="taskForm"
      >
        Add a task
      </div>
      <div
        className="top-menu-item"
        onClick={onTopMenuItemClick}
        data-page="taskList"
      >
        Task List
      </div>
    </Collapse>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'taskList',
      topMenuVisible: false
    };
  }

  toggleTopMenu = () => {
    this.setState({ topMenuVisible: !this.state.topMenuVisible });
  }

  onTopMenuItemClick = e => {
    this.setState({
      selectedPage: e.target.getAttribute('data-page'),
      topMenuVisible: false
    });
  }

  render() {
    const { selectedPage } = this.state;
    return (
      <div id={this.props.id}>
        <TopBar
          selectedPage={selectedPage}
          toggleTopMenu={this.toggleTopMenu}
        >
          <TopMenu
            topMenuVisible={this.state.topMenuVisible}
            onTopMenuItemClick={this.onTopMenuItemClick}
          />
        </TopBar>
        {selectedPage==='taskForm' && <TaskFormContainer/>}
        {selectedPage==='taskList' && <TaskListContainer/>}
      </div>
    );
  }
}

export default App;
