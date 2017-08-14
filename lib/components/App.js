'use babel';

import React from 'react';
import { Collapse } from 'react-collapse';
import TodoFormContainer from './TodoForm';
import TodoListContainer from './TodoList';

const TopBar = ({ children, toggleTopMenu, selectedPage }) => (
  <atom-panel className="padded">
    <div className="panel-heading top-menu-button">
      <i
        className="icon icon-three-bars"
        onClick={toggleTopMenu}
      >
      </i>
      {selectedPage==='todoForm' ? 'Add a todo': null}
      {selectedPage==='todoList' ? 'Todo List': null}
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
        data-page="todoForm"
      >
        Add a todo
      </div>
      <div
        className="top-menu-item"
        onClick={onTopMenuItemClick}
        data-page="todoList"
      >
        Todo List
      </div>
    </Collapse>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 'todoList',
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
        {selectedPage==='todoForm' && <TodoFormContainer/>}
        {selectedPage==='todoList' && <TodoListContainer/>}
      </div>
    );
  }
}

export default App;
