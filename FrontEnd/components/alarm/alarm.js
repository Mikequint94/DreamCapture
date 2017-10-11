import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

export default class AlarmScreen extends React.Component {
  static navigationOptions = {
      title: 'Alarm',
  };

  constructor(props) {
    super(props);
    this.state = {
      cal_auth: ''
    };
  }

  componentDidMount() {
    RNCalendarEvents.authorizationStatus()
    .then(status => {
      this.setState({ cal_auth: status })
      if(status === 'undetermined') {
        
      }
    })
  }



  render() {
    return (
      <View style={styles.container}>
        <Text> Alarm Screen </Text>
        <Text> {this.state.cal_auth} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
