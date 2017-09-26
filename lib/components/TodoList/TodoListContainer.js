'use babel';

import _ from 'lodash';
import React from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TodoItemContainer from './TodoItemContainer';
import TodoListActions from './TodoListActions';
import TodoListBackgroundMessage from './TodoListBackgroundMessage';
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
    TodoService.getAllTodos()
      .then((todos = []) =>
        this.setState({
          todos: _.sortBy(todos, ['idx'])
        })
      )
      .catch(err => {
        throw err;
      });
  }
  get todos() {
    const { todos, listFilter } = this.state;
    return _.filter(todos, todo => {
      if (listFilter === 'all') {
        return true;
      } else if (listFilter === 'completed') {
        return todo.status === 'completed';
      } else if (listFilter === 'pending') {
        return todo.status != 'completed';
      }
    });
  }
  setTodoStatus = (todoId, status) => {
    TodoService.setTodoStatus(todoId, status)
      .then(updatedTodo => {
        const todoIndex = _.findIndex(this.state.todos, { _id: todoId });
        this.setState(
          update(this.state, {
            todos: {
              $splice: [
                [todoIndex, 1],
                [todoIndex, 0, Object.assign({}, updatedTodo)]
              ]
            }
          })
        );
      })
      .catch(err => {
        throw err;
      });
  };
  deleteTodo = todoId => {
    TodoService.deleteTodo(todoId)
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(todo => todo._id != todoId)
        });
      })
      .catch(err => {
        throw err;
      });
  };
  onTitleClick = todoId => {
    const { todos } = this.state;
    const todoIndex = _.findIndex(todos, { _id: todoId });
    if (todoIndex >= 0) {
      const clickedTodo = todos[todoIndex];
      const descOpen = !clickedTodo.descOpen;
      this.setState(
        update(this.state, {
          todos: {
            $splice: [
              [todoIndex, 1],
              [todoIndex, 0, Object.assign({}, clickedTodo, { descOpen })]
            ]
          }
        })
      );
    }
  };
  onListFilterClick = listFilter => {
    this.setState({ listFilter });
  };
  moveTodo = (dragIndex, hoverIndex) => {
    const { todos } = this.state;
    const dragCard = todos[dragIndex];
    const hoverCard = todos[hoverIndex];

    TodoService.reorderTodo(dragCard._id, hoverCard.idx)
      .then(() => TodoService.reorderTodo(hoverCard._id, dragCard.idx))
      .then(() => {
        this.setState(
          update(this.state, {
            todos: {
              $splice: [
                [dragIndex, 1],
                [
                  hoverIndex,
                  0,
                  Object.assign({}, dragCard, { idx: hoverIndex })
                ],
                [dragIndex, 1],
                [dragIndex, 0, Object.assign({}, hoverCard, { idx: dragIndex })]
              ]
            }
          })
        );
      })
      .catch(err => {
        throw err;
      });
  };
  render() {
    return (
      <div>
        <TodoListActions
          listFilter={this.state.listFilter}
          changeListFilter={this.onListFilterClick}
        />
        <div className="todo-list" tabIndex={-1}>
          {this.todos.map((todo, i) => (
            <TodoItemContainer
              key={todo._id}
              index={i}
              {...todo}
              setTodoStatus={this.setTodoStatus}
              deleteTodo={this.deleteTodo}
              onTitleClick={this.onTitleClick}
              moveTodo={this.moveTodo}
              editTodo={this.props.editTodo}
            />
          ))}
        </div>
        {(!this.todos || this.todos.length == 0) && (
            <TodoListBackgroundMessage />
          )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(TodoListContainer);
