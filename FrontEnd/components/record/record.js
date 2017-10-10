import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import Voice from 'react-native-voice';

export default class RecordScreen extends React.Component {
  static navigationOptions = {
      title: 'Record',
  };

  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      finalResults: ""
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    let finalresults = `${this.state.results}`;
    this.setState({
      end: '√',
      finalResults: finalresults
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    console.log(e.value);
    this.setState({
      results: e.value,
    });
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }

  async _startRecognizing(e) {
    console.log("recording started");
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: ''
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: ''
    });
  }

  render() {
    let micpic;
    let finaltext;
    let stopbutton;
    if (this.state.started === "" || this.state.end === "√") {
      micpic = (
          <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
            <Image
              style={styles.button}
              source={require('./button.png')}
            />
          </TouchableHighlight>
      )
      finaltext = (
            <Text>
              {this.state.finalResults}
            </Text>
      )
    } else {
      micpic = (
          <Image
            style={styles.soundwave}
            source={require('./soundwav.gif')}
          />
      )
      stopbutton = (
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Image
            style={styles.button}
            source={require('./stop.png')}
          />
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Record Your Dream
         </Text>
        {micpic}
        {stopbutton}
        {finaltext}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
  },
  soundwave: {
    width: 300,
    height: 250,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 3,
    fontSize: 40,
    color: 'purple',
    textAlign: 'center',
    marginTop: 35,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  result: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 1,
  },
});
