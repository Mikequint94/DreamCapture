import React, { Component } from 'react';
import DreamIndexItem from './dream_index_item';
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
      <View style={styles.mainView}>
        <View style={styles.recordSection}>
          <TouchableHighlight>
            <Image
              style={styles.recordButton}
              source={require('../record/button.png')}
              />
          </TouchableHighlight>
        </View>
        <View style={styles.dreamSection}>
          <Text>Dream Index</Text>
          {dreamList}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,

  },
  recordSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B264A',
  },
  recordButton: {
    width: 100,
    height: 100,
  },
  dreamSection: {
    flex: 3,
  },
});
