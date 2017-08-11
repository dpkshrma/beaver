'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { CompositeDisposable } from 'atom';
import AppView from './AppView';

// process.env.NODE_ENV = 'development';
// NOTE: If enabled without any minified react error, it gives following error:
// "validateDOMNesting.updatedAncestorInfo is not a function"

export default {

  appView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.appView = new AppView(state.appViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.appView,
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'grind:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.appView.destroy();
  },

  serialize() {
    // fetch data from db
    return {
      appViewState: {
        text: 'awesome'
      }
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }
};
