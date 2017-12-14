// Navigation code adapted from
// https://github.com/spencercarli/react-navigation-auth-flow

import React, { Component } from 'react';
import { createRootNavigator } from './root_nav';
import { isSignedIn } from '../actions/session_actions';

export default class AppEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("isSignedIn Error"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const RootNavigator = createRootNavigator(signedIn);
    return <RootNavigator />;
  }
}
