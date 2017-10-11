// Navigation code adapted from
// https://github.com/spencercarli/react-navigation-auth-flow

import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator,
         TabNavigator } from "react-navigation";
// import { FontAwesome } from "react-native-vector-icons";

import SignupContainer from "./session/signup_container";
import LoginContainer from "./session/login_container";

import MainScreen from "./main/main";
import RecordScreen from './record/record_container';
import AlarmScreen from './alarm/alarm';
import DreamShowScreen from './dream/dream_show_container';

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignupContainer,
    navigationOptions: {
      title: "Sign Up Root Nav",
    }
  },
  SignIn: {
    screen: LoginContainer,
    navigationOptions: {
      title: "Log In Root Nav",
    }
  }
});

export const SignedIn = StackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        headerLeft: null
      }
    },
    Record: { screen: RecordScreen },
    Login: { screen: LoginContainer },
    Signup: { screen: SignupContainer },
    Alarm: { screen: AlarmScreen },
    DreamShow: { path: 'dream/:dreamid', screen: DreamShowScreen },
  });

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
