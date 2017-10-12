import React, { Component } from 'react';
import DreamIndexItem from './dream_index_item';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class DreamIndexScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.props.requestUserDreams(this.props.userId);
  }

  render() {
    const dreams = this.props.dreams;
    if (dreams === undefined ) {
      return ( <View></View> );
    }

    const dreamList = dreams.map((dream, idx) => (
        <DreamIndexItem
          key={this.props.userId + idx}
          dream={Object.values(dream)} />
      ));

    return (
      <View>
        <Text>Dream Index</Text>
        {dreamList}
      </View>
    );
  }
}
