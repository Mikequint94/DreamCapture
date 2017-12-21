import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { isSignedIn } from '../../actions/session_actions';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet, Platform, Text, TextInput, View, TouchableOpacity, Button, Keyboard,
  KeyboardAvoidingView, TouchableWithoutFeedback, AppState
} from 'react-native';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
      title: 'Sign Up',
      header: null,
  };

  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  componentWillMount() {
    AppState.addEventListener('change', this.props.clearErrors);
  }

  resetNav() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    isSignedIn()
      .then(res => {
          if (res) {
            this.props.navigation.dispatch(resetAction);
          }
        })
        .catch(err => {});
  }

  handleSignup() {
    this.props.signup(this.state)
      .then((res) => {
        if (res === 'signedin') {this.resetNav();}
      });
  }
  // handleDemoLogin() {
  //   this.props.login({email: "dreamer@gmail.com", password: "password"})
  //     .then((res) => {
  //       if (res === 'signedin') {this.resetNav();}
  //     });
  // }

  renderErrors() {
    return(
      <Text style={styles.errors}>
        {this.props.errors.map((error,idx) => {
          if (idx === this.props.errors.length - 1) {
            return `${error}`;
          } else {
            return `${error} ${"\n"}`;
          }
        }
        )}
      </Text>
    )
  }

  handleLinkNav(){
    const { navigate } = this.props.navigation;
    navigate('SignIn');
    this.props.clearErrors();
  }

  renderErrors() {
    if (this.props.errors.length === 0) {
      return(
        <Text>{"\n"}</Text>
      )
    }
    return(
      <Text style={styles.errors}>
        {this.props.errors.map((error,idx) => {
          if (idx === this.props.errors.length - 1) {
            return `${error}`;
          } else {
            return `${error} ${"\n"}`;
          }
        }
        )}
      </Text>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    const offset = Platform.OS === 'ios' ? 0 : -200;
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={offset}
        behavior="padding"
        style={styles.container}
        >
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Create your account below.
          </Text>

          {this.renderErrors()}

          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Icon style={styles.icon}
                name='envelope-o' size={20} color='#D4CCD9' />
              <View style={styles.inputBorder}>
                <TextInput underlineColorAndroid="transparent" style={styles.input}
                  value={this.state.email}
                  autoCapitalize='none'
                  placeholder='Email'
                  placeholderTextColor='#D4CCD9'
                  onChangeText={ email => this.setState({email})} />
              </View>
            </View>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputRow}>
              <Icon style={styles.icon}
                name='key' size={20} color='#D4CCD9' />
              <View style={styles.inputBorder}>
                <TextInput underlineColorAndroid="transparent" style={styles.input}
                  value={this.state.password}
                  autoCapitalize='none'
                  placeholder='Password'
                  placeholderTextColor='#D4CCD9'
                  secureTextEntry={true}
                  onChangeText={ password => this.setState({password})}/>
              </View>
            </View>
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton}
              onPress={() => this.handleSignup()}>
                <Text style={styles.submitButtonText}> Sign Up </Text>
              </TouchableOpacity>
          </View>
          <Button style={styles.link}
            onPress={() => this.handleLinkNav()}
            title='Log In'
            color='#D4CCD9'
            />
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3254',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D4CCD9',
    marginBottom: 2,
  },
  inputsContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  inputRow: {
    flex: .80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    flex: .10,
    margin: 3,
  },
  inputBorder: {
    flex: 0.9,
    height: Platform.OS === 'ios' ? 40 : 45,
    borderBottomWidth: 1,
    borderColor: '#D4CCD9',
    marginVertical: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#D4CCD9',
    borderColor: '#3E3254',
    backgroundColor: '#3E3254',
    borderWidth: 1,
    borderRadius: 1,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },
  submitContainer: {
    flexDirection: 'row'
  },
  submitButton: {
    flex: 0.8,
    marginTop: 40,
    backgroundColor: '#83BFAA',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  demoLoginButton: {
    flex: 0.8,
    marginTop: 20,
    backgroundColor: '#83BFAA',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  errors: {
    color: '#83BFAA',
    fontSize: 16,
    marginVertical: 4,
  }
});
