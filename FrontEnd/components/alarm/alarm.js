import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

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
    this.setAlarm = this.setAlarm.bind(this);
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

    // RNCalendarEvents.findCalendars()
    //   .then(calendars => {
    //     console.log(calendars);
    //   });


    this.updateTime();
    clockId = setInterval(this.updateTime, 1000);

  }

  componentWillUnmount() {
    clearInterval(clockId);
  }

  setAlarm() {


    RNCalendarEvents.saveEvent(`Example Event`, {
      startDate: "2017-10-11T17:42:00.000Z",
      endDate: "2017-10-11T17:47:00.000Z",
      calendar: ['Calendar'],
      alarm: [{
        date:"2017-10-11T17:42:00.000Z"
      }],
    })
    .then(id => {
      console.log(id);
    }).catch(error => console.log('Save Event Error: ', error));
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
        <TouchableOpacity style={styles.submitButton}
          onPress={this.setAlarm} >
          <Text style={styles.submitButtonText}> Alarm </Text>
        </TouchableOpacity>
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
  submitButton: {
    margin: 10,
    backgroundColor: '#2830a5',
    height: 40,
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
});
