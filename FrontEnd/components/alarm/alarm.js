import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import RNCalendarEvents from 'react-native-calendar-events';

export default class AlarmScreen extends React.Component {
  static navigationOptions = {
      title: 'Alarm',
  };

  constructor(props) {
    super(props);
    this.state = {
      cal_auth: '',
      time: '',
      date: '',
      events: '',
    };
    this.time = new Date;

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    RNCalendarEvents.authorizationStatus()
      .then(status => {
        this.setState({ cal_auth: status })
        if(status === 'undetermined') {
          RNCalendarEvents.authorizeEventStore()
          .then((newStatus) => {
            if(newStatus == 'authorized') {
              this.setState({ cal_auth: newStatus })
            }
          })
        }
      })
      .catch(error => console.warn('Auth Error: ', error));


    this.updateTime();
    clockId = setInterval(this.updateTime, 1000);

  }

  componentWillUnmount() {
    clearInterval(clockId);
  }



  updateTime() {
    this.time = new Date();
    this.setState({time: this.time.toTimeString(),
                   date: this.time.toDateString()
                 });
  }



  render() {
    return (
      <View style={styles.container}>
        <Text> Alarm Screen </Text>
        <Text> {this.state.cal_auth} </Text>
        <Text> {this.state.time.slice(0, 8)} </Text>
        <Text> {this.state.date} </Text>
        <Text> {this.state.events} </Text>
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
