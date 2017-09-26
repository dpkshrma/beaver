'use babel';

/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppComponent } from './components';

class AppWrapperElement extends HTMLElement {
  attachedCallback() {
    if (!document.getElementById('beaver-app')) {
      ReactDOM.render(<AppComponent id="beaver-app" />, this);
    }
  }

  detachedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'pkgstate') {
      const { text } = JSON.parse(newVal);
      ReactDOM.render(<AppComponent id="beaver-app" text={text} />, this);
    }
  }

  set pkgstate(val) {
    if (val) {
      this.setAttribute('pkgstate', JSON.stringify(val));
    } else {
      this.removeAttribute('pkgstate');
    }
  }

  get pkgstate() {
    return this.hasAttribute('pkgstate');
  }
}

// NOTE: Must have a hyphen in element type! Else, type is considered invalid
const AppWrapper = document.registerElement('app-wrapper', AppWrapperElement);

class AppView {
  constructor(serializedState) {
    // Create root element
    this.element = new AppWrapper();
    this.element.pkgstate = serializedState;
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}

export default AppView;
