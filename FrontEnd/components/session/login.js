import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { login } from '../../actions/session_actions';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
      title: 'Log In',
  };

  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  signup() {
    login(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome, create an account.
        </Text>
        <TextInput style={styles.input}
          value={this.state.email}
          placeholder='Email'
          onChangeText={(email) => this.setState({email})} />
        <TextInput style={styles.input}
          value={this.state.password}
          placeholder='Password'
          onChangeText={(password) => this.setState({password})}/>
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
