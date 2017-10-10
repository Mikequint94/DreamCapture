import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import AppEntry from './components/app_entry';


class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <AppEntry/>
      </Provider>
    );
  }
}

export default App;
