'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import { CompositeDisposable } from 'atom';
import AppView from './AppView';
import beaverDB from './helpers/db';
import { dBPath } from './config';

// console.log('Lib Versions: ');
// console.log(process.versions);

// process.env.NODE_ENV = 'development';
// NOTE: If enabled without any minified react error, it gives following error:
// "validateDOMNesting.updatedAncestorInfo is not a function"
// so, rather run atom in development mode (atom --dev) to get unminified react error

let INIT_CALLED = false;

export default {
  db: null,
  appView: null,
  modalPanel: null,
  subscriptions: null,

  initialize(state) {
    // initialize database with config
    this.db = beaverDB.configure({ dBPath });
    INIT_CALLED = true;
  },

  activate(state) {
    if (!INIT_CALLED) {
      this.initialize();
    }

    this.appView = new AppView(state.appViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.appView,
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'beaver:toggle': () => this.toggle()
      })
    );
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.appView.destroy();
  },

  serialize() {
    // fetch data from db
    return { appViewState: {} };
  },

  toggle() {
    return this.modalPanel.isVisible()
      ? this.modalPanel.hide()
      : this.modalPanel.show();
  }
};
