import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class DreamShowScreen extends React.Component {
  static navigationOptions = {
      title: 'Dream Show',
  };

  componentDidMount(){
    this.props.requestDream(this.props.navigation.state.params.dreamId);
  }

  render() {
    let currentDream = this.props.navigation.state.params.dreamId;
    console.log(this.props);
    console.log(this.props.dreams[currentDream].body);
    let dreams;
    if (this.props.dreams[currentDream]) {
      dreams = (
        <Text>{this.props.dreams[currentDream].body}</Text>
      )
    }
    return (
      <View>
        {dreams}
      </View>
    )
  }
}
