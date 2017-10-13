import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationsHandler from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
       alert: true,
       badge: true,
       sound: false
     },
     // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    requestPermissions: false,
  });

export default class AlarmScreen extends React.Component {
  static navigationOptions = {
      title: 'Alarm',
  };

  constructor(props) {
    super(props);
    this.state = {
      reminderSet: false,
      reminderTimer: '',
      time: '',
      date: '',
    };
    // this.time = new Date;

    // this.updateTime = this.updateTime.bind(this);
    this.setAlarm = this.setAlarm.bind(this);
    this.cancelAlarm = this.cancelAlarm.bind(this);
  }

  componentDidMount() {
    PushNotificationsHandler.requestPermissions()

    // this.updateTime();
    // clockId = setInterval(this.updateTime, 1000);

  }

  componentWillUnmount() {
    // clearInterval(clockId);
  }

  setAlarm() {
    PushNotification.cancelAllLocalNotifications()
    PushNotification.localNotificationSchedule({
      message: "Record your dream", // (required)
      date: new Date(Date.now() + (10 * 1000)),
      repeatType:'day',
      repeatInterval: "day"
    });

    this.setState({reminderSet: true})
  }

  cancelAlarm() {
    PushNotification.cancelAllLocalNotifications()
    this.setState({reminderSet: false})
  }



  // updateTime() {
  //   this.time = new Date();
  //   this.setState({time: this.time.toTimeString(),
  //                  date: this.time.toDateString()
  //                });
  // }



  render() {
    let button = null
    if (this.state.reminderSet) {
      button  =  <TouchableOpacity style={styles.submitButton}
                    onPress={this.cancelAlarm} >
                    <Text style={styles.submitButtonText}
                      > Cancel Reminder </Text>
                  </TouchableOpacity>
    } else {
      button  =  <TouchableOpacity style={styles.submitButton}
                    onPress={this.setAlarm} >
                    <Text style={styles.submitButtonText}> Set Reminder </Text>
                  </TouchableOpacity>
    }

    return (
      <View style={styles.container}>
        <Text> When do you usually wake up? </Text>
        <Text> {this.state.time.slice(0, 8)} </Text>
        <Text> {this.state.date} </Text>
        {button}
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
