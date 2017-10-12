import React, { Component } from 'react';
import DreamIndexItem from './dream_index_item';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image
} from 'react-native';

export default class DreamIndexScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.props.requestUserDreams(this.props.userId);
  }

  parseDate(timestamp) {
    const time = timestamp.split('-');
    const year = time[0];
    const month = time[1];
    const day = time[2].slice(0,2);
    return [year, month, day];
  };

  dreamList() {
    const dreams = this.props.dreams;
    if (Object.keys(dreams).length === 0
        && dreams.constructor === Object ) {
      return ( <View></View> );
    }

    const dreamList = dreams.map((dream, idx) => (
        <DreamIndexItem
          key={this.props.userId + idx}
          dream={Object.values(dream)}
          parseDate={this.parseDate} />
      ));

    return dreamList;
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.recordSection}>
          <TouchableHighlight>
            <Icon name='microphone' size={75} color="white" />
          </TouchableHighlight>
        </View>
        <View style={styles.dreamSection}>
          <Text>Dream Index</Text>
          {this.dreamList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  recordSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B264A',
  },
  dreamSection: {
    flex: 3,
  },
});
