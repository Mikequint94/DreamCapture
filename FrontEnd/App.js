import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainScreen from './components/main/main';
import RecordScreen from './components/record/record';
import LoginScreen from './components/auth/login';
import SignupScreen from './components/auth/signup';
import AlarmScreen from './components/alarm/alarm';
import DreamShowScreen from './components/dream/dream_show';

export default App = StackNavigator({
  Main: { screen: MainScreen },
  Record: { screen: RecordScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Alarm: { screen: AlarmScreen },
  DreamShow: { screen: DreamShowScreen },
});
