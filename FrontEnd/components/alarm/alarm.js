import React, { Component } from 'react';
import {receiveReminder} from '../../actions/reminder_actions';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationsHandler from 'react-native-push-notification';
import DatePicker from 'react-native-datepicker'

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
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
      reminderSet: this.props.reminder.set || false,
      time: this.props.reminder.time || '06:00 am',
    };

    this.setAlarm = this.setAlarm.bind(this);
    this.cancelAlarm = this.cancelAlarm.bind(this);
  }


  parseTime() {
    timeArr = this.state.time.split(" ");
    amPm = timeArr[1];
    time = timeArr[0].split(":").map( (time) => {
      return parseInt(time);
    })
    if (amPm == 'pm') {
      time[0] += 12;
    }
    return time
  }

  setAlarm() {
    PushNotificationsHandler.requestPermissions()
    let time = this.parseTime();

    let now = new Date();
    let reminder = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1])

    if (reminder < now) {
      reminder.setHours(reminder.getHours() + 24)
    }

    PushNotification.cancelAllLocalNotifications()
    PushNotification.localNotificationSchedule({
      message: "Record your dream", // (required)
      date: reminder,
      repeatType:'day',
      repeatInterval: 'day'
    });

    this.setState({reminderSet: true})
    this.props.receiveReminder({time: this.state.time,
                                set: true})
  }

  cancelAlarm() {
    PushNotification.cancelAllLocalNotifications()
    this.setState({reminderSet: false})
    this.props.receiveReminder({time: this.state.time,
                                set: false})
  }


  render() {
    let button = null;
    let text = null;
    if (this.state.reminderSet) {
      button  =  <TouchableOpacity style={styles.submitButton}
                    onPress={this.cancelAlarm} >
                    <Text style={styles.submitButtonText}
                      > Cancel Reminder </Text>
                  </TouchableOpacity>
      text = <Text> We'll send you a reminder to record your dream around: </Text>
    } else {
      button  =  <TouchableOpacity style={styles.submitButton}
                    onPress={this.setAlarm} >
                    <Text style={styles.submitButtonText}> Set Reminder </Text>
                  </TouchableOpacity>
      text = <Text> When do you usually wake up? </Text>
    }

    return (
      <View style={styles.container}>
        {text}
        <DatePicker
        date={this.state.time}
        mode="time"
        format="h:mm a"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon= {false}
        customStyles={{
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(time) => {
          this.setState({
            time: time,
          })
          this.cancelAlarm()
        }}
      />
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
