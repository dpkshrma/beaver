'use babel';

import React from 'react';
import { Collapse } from 'react-collapse';
import TodoFormContainer from './TodoForm';
import TodoListContainer from './TodoList';
import { TodoService } from '../services';

const TODO_FORM = 'todoForm';
const TODO_LIST = 'todoList';

const TopBar = ({ children, toggleTopMenu, selectedPage }) => (
  <atom-panel className="padded">
    <div className="panel-heading top-menu-button">
      <i
        className="icon icon-three-bars"
        onClick={toggleTopMenu}
      >
      </i>
      {selectedPage===TODO_FORM ? 'Add a todo': null}
      {selectedPage===TODO_LIST ? 'Todo List': null}
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
      selectedPage: TODO_LIST,
      topMenuVisible: false,
      activeTodo: null
    };
  }

  toggleTopMenu = () => {
    this.setState({ topMenuVisible: !this.state.topMenuVisible });
  }

  onTopMenuItemClick = e => {
    this.setState({
      selectedPage: e.target.getAttribute('data-page'),
      topMenuVisible: false,
      activeTodo: null
    });
  }

  editTodo = todoId => {
    TodoService
      .getTodo(todoId)
      .then(todo => {
        if (todo) {
          this.setState({
            selectedPage: TODO_FORM,
            activeTodo: todo
          });
        }
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
        {selectedPage===TODO_FORM && <TodoFormContainer todo={this.state.activeTodo} />}
        {selectedPage===TODO_LIST && <TodoListContainer editTodo={this.editTodo} />}
      </div>
    );
  }
}

export default App;
