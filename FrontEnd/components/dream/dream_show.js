import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import WatsonAnalyzer from './watson';

export default class DreamShowScreen extends React.Component {
  static navigationOptions = {
      title: 'Dream Show',
  };

  componentDidMount(){
    this.props.requestDream(this.props.navigation.state.params.dreamId);
  }

  render() {
    let currentDream = this.props.navigation.state.params.dreamId;
    // let analysis = WatsonAnalyzer.analyze(this.props.dreams[currentDream].body)
    // console.log(analysis);
    console.log(this.props);
    // console.log(this.props.dreams[currentDream].body);
    let dreams;
    let watson;
    if (this.props.dreams[currentDream]) {
      dreams = (
        <Text>{this.props.dreams[currentDream].body}</Text>
      )
      watson = (
        <WatsonAnalyzer string={this.props.dreams[currentDream].body} />
      )
    }
    return (
      <View>
        {dreams}
        {watson}
      </View>
    )
  }
}
