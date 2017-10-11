import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import AppEntry from './components/app_entry';

export default class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <AppEntry/>
      </Provider>
    );
  }
}
