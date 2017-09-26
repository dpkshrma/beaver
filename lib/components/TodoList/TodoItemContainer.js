'use babel';

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import TodoItem from './TodoItem';

const cardSource = {
  beginDrag(props) {
    return {
      id: props._id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTodo(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class TodoItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTillDeadline: null,
      timerIntervalId: null
    };
  }
  componentWillMount() {
    const {
      status,
      duration,
      durationUnit,
      activatedAt = [],
      deactivatedAt = []
    } = this.props;

    const totalActiveTime = this.getTodoActiveTime(
      _.concat(activatedAt, deactivatedAt),
      status
    );
    const newTimeTillDeadline =
      moment.duration(duration, durationUnit).valueOf() - totalActiveTime;
    this.setState({ timeTillDeadline: newTimeTillDeadline });
  }
  componentDidMount() {
    const { timeTillDeadline } = this.state;
    const self = this;
    if (this.state.timeTillDeadline) {
      const intervalId = setInterval(() => {
        self.setState({ timeTillDeadline: this.state.timeTillDeadline - 1000 });
      }, 1000);
      this.setState({ timerIntervalId: intervalId });
    }
  }
  componentWillUnmount() {
    // clear timer interval
    window.clearInterval(this.state.timerIntervalId);
    this.setState({ timerIntervalId: null });
  }
  /**
   * Returns total time in ms that a todo has been active
   * @param  {Array} timestamps All active/inactive timestamps in alternate order starting with active timestamp
   * @param  {String} todoStatus todo status (active/inactive/completed)
   * @return {Number}            Total amount of time that todo remained active
   */
  getTodoActiveTime = (timestamps, todoStatus) => {
    let totalActiveTime = 0;
    // flag to skip alternate cycles of reduce so that ts1 = activatedAt, ts2=deactivatedAt timestamp
    let isActiveTimestamp = true;
    _.reduce(_.sortBy(timestamps), (ts1, ts2) => {
      if (isActiveTimestamp) {
        totalActiveTime += ts2 - ts1;
      }
      isActiveTimestamp = !isActiveTimestamp;
      return ts2;
    });
    // also add active time of todo till now
    if (todoStatus === 'active') {
      const lastActivatedOn = _.last(_.sortBy(timestamps));
      totalActiveTime += Date.now() - lastActivatedOn;
    }
    return totalActiveTime;
  };
  render() {
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ cursor: 'move', opacity }}>
          <TodoItem
            {...this.props}
            updateTimeTillDeadline={this.updateTimeTillDeadline}
            timeTillDeadline={this.state.timeTillDeadline}
          />
        </div>
      )
    );
  }
}

export default _.flow(
  DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(TodoItemContainer);
