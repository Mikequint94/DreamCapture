import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Card,
  Button,
} from 'react-native';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
      title: 'Sign Up',
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

  handleSignup() {
    const { navigate } = this.props.navigation;
    this.props.signup(this.state)
    this.resetNav()
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <Text style={styles.header}>
          Welcome, please sign up.
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
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={ password => this.setState({password})}/>
        </View>
        <TouchableOpacity style={styles.submitButton}
          onPress={
            () => this.handleSignup() }>
            <Text style={styles.submitButtonText}> Sign Up </Text>
          </TouchableOpacity>
        <Button
          onPress={() => navigate('SignIn')}
          title='Log In'
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
