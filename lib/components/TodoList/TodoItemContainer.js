'use babel';

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import TodoItem from './TodoItem';

class TodoItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTillDeadline: null,
      timerIntervalId: null
    };
  }
  componentWillMount() {
    const { status, duration, durationUnit, activatedAt=[], deactivatedAt=[] } = this.props.todo;

    const totalActiveTime = this.getTodoActiveTime(_.concat(activatedAt, deactivatedAt), status);
    const newTimeTillDeadline = moment.duration(duration, durationUnit).valueOf()-totalActiveTime;
    this.setState({ timeTillDeadline: newTimeTillDeadline });
  }
  componentDidMount() {
    if (!this.state.something) {
      this.setState({ something: 'cool' });
    }
    const { timeTillDeadline } = this.state;
    const self = this;
    if (this.state.timeTillDeadline) {
      const intervalId = setInterval(() => {
        self.setState({ timeTillDeadline: this.state.timeTillDeadline-1000 });
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
        totalActiveTime += (ts2-ts1);
      }
      isActiveTimestamp = !isActiveTimestamp;
      return ts2;
    });
    // also add active time of todo till now
    if (todoStatus === 'active') {
      const lastActivatedOn = _.last(_.sortBy(timestamps));
      totalActiveTime+=(Date.now()-lastActivatedOn);
    }
    return totalActiveTime;
  };
  render() {
    return (
      <TodoItem
        {...this.props}
        updateTimeTillDeadline={this.updateTimeTillDeadline}
        timeTillDeadline={this.state.timeTillDeadline}
      />
    );
  }
}

export default TodoItemContainer;
