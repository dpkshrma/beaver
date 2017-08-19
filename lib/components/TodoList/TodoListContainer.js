'use babel';

import _ from 'lodash';
import React from 'react';
import TodoList from './TodoList';
import { TodoService } from '../../services';

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      listFilter: 'all'
    };
  }
  componentWillMount() {
    TodoService
      .getAllTodos()
      .then((todos=[]) => this.setState({ todos }))
      .catch(err => {
        throw err;
      });
  }
  setTodoStatus = (todoId, status) => {
    TodoService
      .setTodoStatus(todoId, status)
      .then(updatedTodo => {
        this.setState({
          todos: [
            ...this.state.todos.filter(todo => todo._id != updatedTodo._id),
            updatedTodo
          ]
        });
      })
      .catch(err => {
        throw err;
      });
  }
  deleteTodo = todoId => {
    TodoService
      .deleteTodo(todoId)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(todo => todo._id != todoId)
        });
      })
      .catch(err => {
        throw err;
      });
  }
  onTitleClick = todoId => {
    const { todos } = this.state;
    const clickedTodo = _.find(todos, { _id: todoId });

    let descOpen = true;
    if (clickedTodo && clickedTodo.descOpen) {
      descOpen = false;
    }

    this.setState({
      todos: [
        ...todos.filter(todo => todo._id != todoId),
        Object.assign({}, clickedTodo, { descOpen })
      ]
    });
  }
  onListFilterClick = listFilter => {
    this.setState({ listFilter });
  }
  render() {
    const todoList = (
      <TodoList
        todos={this.state.todos}
        listFilter={this.state.listFilter}
        setTodoStatus={this.setTodoStatus}
        deleteTodo={this.deleteTodo}
        onTitleClick={this.onTitleClick}
        changeListFilter={this.onListFilterClick}
      />
    );
    return todoList;
  }
}

export default TodoListContainer;
