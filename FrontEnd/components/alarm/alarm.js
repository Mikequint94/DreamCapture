import React, { Component } from 'react';
import {receiveReminder} from '../../actions/reminder_actions';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationsHandler from 'react-native-push-notification';
import DatePicker from 'react-native-datepicker'

PushNotification.configure({
  ...Platform.select({
    ios: {
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
    },
    android: {
      onNotification: function(notification) {
             console.log( 'NOTIFICATION:', notification );
      },
      popInitialNotification: true,
    },
  }),

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
    console.log(this.props.reminder);
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
    console.log(reminder);
    console.log(now);
    if (reminder < now) {
      reminder.setHours(reminder.getHours() + 24)
    }

    PushNotification.cancelAllLocalNotifications()
    PushNotification.localNotificationSchedule({
      message: "Record your dream", // (required)
      date: reminder,
      ...Platform.select({
        android: {
          color: "#3E3254",
          smallIcon: "ic_notification",
        },
      }),
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
      text = <Text style={styles.text}> We will send you a reminder to record your dream around: </Text>
    } else {
      button  =  <TouchableOpacity style={styles.submitButton}
                    onPress={this.setAlarm} >
                    <Text style={styles.submitButtonText}> Set Reminder </Text>
                  </TouchableOpacity>
      text = <Text style={styles.text}> When do you usually wake up? </Text>
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {text}
        </View>
        <DatePicker
        date={this.state.time}
        mode="time"
        format="h:mm a"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon= {false}
        customStyles={{
          dateInput: {
            borderRadius: 5,
            borderColor: '#D4CCD9',
          },
          dateText: {
            color: '#D4CCD9',
            fontSize: 24,
            fontWeight: '600',
          },
        }}
        onDateChange={(time) => {
          this.setState({
            time: time,
          })
          this.cancelAlarm()
        }}
      />
      {button}
      <View style={{height:63}}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3254',
  },
  submitButton: {
    margin: 25,
    backgroundColor: '#83BFAA',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 6,
  },
  submitButtonText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    marginHorizontal: 30,
    marginBottom: 25,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#D4CCD9',
    textAlign: 'center',
  }
});
