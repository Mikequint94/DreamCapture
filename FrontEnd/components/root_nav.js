// Navigation code adapted from
// https://github.com/spencercarli/react-navigation-auth-flow

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';

import MainContainer from './main/main_container';
import DreamIndexContainer from './dream/dream_index_container';

import RecordScreen from './record/record_container';
import AlarmContainer from './alarm/alarm_container';
import DreamShowScreen from './dream/dream_show_container';
import NewDreamShowScreen from './dream/new_dream_show_container';

export const DreamStack = StackNavigator({
  Home: {screen: DreamIndexContainer },
  DreamShow: {
    path: 'dream/:dreamid',
    screen: DreamShowScreen,
    navigationOptions: {
      headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3E3254' }
    }},
  NewDreamShow: {
    path: 'dream/:dreamid',
    screen: NewDreamShowScreen,
    navigationOptions: {
      headerTitleStyle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3E3254' }
    }},
  Record: {
    screen: RecordScreen,
    navigationOptions: {
      title: 'Record A Dream',
      ...Platform.select({
        android: {
          header: null
        },
      }),
      headerTitleStyle: { color: '#3E3254' },
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#3E3254' },
    }},
});

export const SignedIn = TabNavigator({
  Home: {
    screen: DreamStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />
    },
  },
  Alarm: {
    screen: AlarmContainer,
    navigationOptions: {

      tabBarIcon: ({ tintColor }) => <Icon name="alarm" size={35} color={tintColor} />
    },
  },
}, {
    tabBarPosition: 'bottom',
    ...Platform.select({
      android: {
        lazy: true,
      },
    }),
    tabBarOptions: {
    showLabel: false,
    ...Platform.select({
      android: {
        showIcon: true,
        indicatorStyle: {
          backgroundColor: '#D4CCD9',
        },
        iconStyle: {
            width: 45,
            height: 35
        },
      },
    }),
    activeTintColor: '#83BFAA',
    inactiveTintColor: '#D4CCD9',
    style: {
      borderTopWidth: 1,
      paddingTop: 6,
      borderTopColor: '#D4CCD9',
      backgroundColor: '#3E3254',
    },
  },
});

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignupContainer,
    navigationOptions: {
      title: "Sign Up Root Nav",
      headerLeft: null
    }
  },
  SignIn: {
    screen: LoginContainer,
    navigationOptions: {
      title: "Log In Root Nav",
      headerLeft: null
    }
  },
  Home: {
    screen: SignedIn,
  },
},
  {
    headerMode: 'none',
  }
);

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
