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
    this.props.requestDream(1);
  }

  render() {
    console.log(this.props);
    let dreams;
    if (this.props.dreams[0]) {
      dreams = (
        <Text>{this.props.dreams[0]}</Text>
      )
    }
    return (
      <View>
        {dreams}
        <Text> Dream Show Screen </Text>
      </View>
    )
  }
}
