import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
      title: 'Signup',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome, create an account.
        </Text>
        <TextInput style={styles.input}
          placeholder='Email' />
        <TextInput style={styles.input}
          placeholder='Password' />
        <View style={{margin: 10}} />
        <TouchableOpacity style={styles.submitButton}
          onPress={
            () => this.signup(this.state.email, this.state.password)}>
          <Text style={styles.submitButtonText}> Sign Up </Text>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    // flex: 1,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
  },
  submitButton: {
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
