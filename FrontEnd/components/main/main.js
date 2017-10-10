import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = {
      title: 'Main',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to DreamCapture
        </Text>
        <Button
          onPress={() => navigate('Record')}
          title="Record a dream"
        />
        <Button
          onPress={() => navigate('Login')}
          title="Log In"
        />
        <Button
          onPress={() => navigate('Signup')}
          title="Sign Up"
        />
        <Button
          onPress={() => navigate('Alarm')}
          title="Alarm Show Page"
        />
        <Button
          onPress={() => navigate('DreamShow')}
          title="Dream Show Page"
        />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
