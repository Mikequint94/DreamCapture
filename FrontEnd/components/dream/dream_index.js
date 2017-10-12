import React, { Component } from 'react';
import DreamIndexItem from './dream_index_item';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Button, TouchableHighlight,
         Image, FlatList } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'

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

    const dreamList =
      <FlatList
        data={dreams}
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => (
          this.renderFlatListItem(item)
        )}
      />
    return dreamList;
  }

  renderFlatListItem(item) {
    const dream = Object.values(item)[0];
    const timeStamp = dream.created_at;
    const dayNum = this.parseDate(timeStamp)[2];
    return (
      <ListItem
        title={`${dream.body}`}
        avatar={<Avatar
                  medium
                  title={dayNum}
                />}
      />
    )
  }

  keyExtractor(item){
    const dream = Object.values(item)[0];
    return dream.id;
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
          <List>
            {this.dreamList()}
          </List>
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
