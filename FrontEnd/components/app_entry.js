import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainScreen from './main/main';
import RecordScreen from './record/record';
import LoginContainer from './session/login_container';
import SignupScreen from './session/signup';
import AlarmScreen from './alarm/alarm';
import DreamShowScreen from './dream/dream_show';

export default AppEntry = StackNavigator({
  Main: { screen: MainScreen },
  Record: { screen: RecordScreen },
  Login: { screen: LoginContainer },
  Signup: { screen: SignupScreen },
  Alarm: { screen: AlarmScreen },
  DreamShow: { screen: DreamShowScreen },
});
