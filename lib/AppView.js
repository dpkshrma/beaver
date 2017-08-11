'use babel';

/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './App';

class AppElement extends HTMLElement {
  attachedCallback() {
    ReactDOM.render(<AppComponent />, this);
  }
  detachedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

// NOTE: Must have a hyphen in element type! Else, type is considered invalid
const grindAppElement = document.registerElement('grind-app', AppElement);

class AppView {
  constructor(serializedState) {
    // Create root element
    this.element = new grindAppElement();
    this.id = "grind-app";
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

export default AppView;
