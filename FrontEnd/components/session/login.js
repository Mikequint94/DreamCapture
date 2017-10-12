import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { isSignedIn } from '../../actions/session_actions';

import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
      title: 'Log In',
  };

  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  resetNav() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  handleLogin() {
    this.props.login(this.state)
    if (isSignedIn()) {
      this.resetNav();
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome, please log in.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            value={this.state.email}
            autoCapitalize='none'
            placeholder='Email'
            onChangeText={ email => this.setState({email})} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            value={this.state.password}
            autoCapitalize='none'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={ password => this.setState({password})}/>
        </View>
        <TouchableOpacity style={styles.submitButton}
          onPress={
            () => this.handleLogin()}>
            <Text style={styles.submitButtonText}> Log In </Text>
          </TouchableOpacity>
        <Button
          onPress={() => navigate('SignUp')}
          title='Sign Up'
          />
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
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 0.8,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
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
