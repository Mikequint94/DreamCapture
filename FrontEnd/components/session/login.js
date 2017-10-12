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
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton}
            onPress={
              () => this.handleLogin()}>
              <Text style={styles.submitButtonText}> Log In </Text>
            </TouchableOpacity>
        </View>
        <Button style={styles.link}
          onPress={() => navigate('SignUp')}
          title='Sign Up'
          color='#443E62'
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
    backgroundColor: '#EDF2F4',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    color: '#3B264A',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 0.8,
    height: 40,
    borderColor: '#9BB0AF',
    borderWidth: 1,
    borderRadius: 1,
    marginVertical: 3,
  },
  submitContainer: {
    flexDirection: 'row'
  },
  submitButton: {
    flex: 0.8,
    marginTop: 10,
    backgroundColor: '#83BFAA',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  link: {
    color: '#3B264A',
  }
});
