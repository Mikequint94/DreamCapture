import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert,
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

  saveDream() {
    const { navigate } = this.props.navigation;
    this.props.createDream({body: this.state.finalResults, user_id: this.props.currentUser})
    .then(
    (response) => {
      navigate('DreamShow', {dreamId: response.dream.data.id})
    .catch(error => console.log(error))
    }
  )
  }
  rerecord() {
    Alert.alert(
      'Are you sure?',
      'Your current recording will not be saved.',
      [
        {text: 'Yes', onPress: () => {
          this._destroyRecognizer.bind(this);
          this.setState({
            recognized: '',
            pitch: '',
            error: '',
            started: '',
            results: [],
            partialResults: [],
            end: ''
          });
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
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
    let middleTextPic;
    let bottomButton;
    let string = this.state.finalResults;
    let analysis = "loading"
    let topText;
    console.log(string);
    if (this.state.end === "√") {
      // let analysis = WatsonAnalyzer.analyze(string)
      // console.log(analysis);
      topText = (
        <Text style={styles.welcome}>
          Edit and Save
        </Text>
      )
      middleTextPic = (
        <View style={styles.middleContainer}>
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({finalResults: text})}
              value={this.state.finalResults}
              multiline={true}
            />
        </View>
      )
      bottomButton = (
        <View style={styles.bottomContainer}>
          <TouchableHighlight onPress={this.rerecord.bind(this)}>
            <Image
              style={{height:80, width: 80, marginHorizontal: 30}}
              source={require('./rerecord.png')}
              />
          </TouchableHighlight>
          <Button style={{ height:80, width: 80, marginHorizontal: 30}} onPress={
              this.saveDream.bind(this)
                }
            title="Save" />
        </View>
      )
    }
    if (this.state.started === "") {
      console.log(this.props);
      topText = (
        <Text style={styles.welcome}>
          Record Your Dream
        </Text>
      )
      bottomButton = (
          <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
            <Image
              style={styles.button}
              source={require('./button.png')}
            />
          </TouchableHighlight>
      )

    } else if (this.state.end === "") {
      topText = (
        <Text style={styles.welcome}>
          Recording...
         </Text>
      )
      middleTextPic = (
        <View style={styles.middleContainer}>
          <Image
            style={styles.soundwave}
            source={require('./soundwav.gif')}
          />
      </View>
      )
      bottomButton = (
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
        {topText}
        {middleTextPic}
        {bottomButton}
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
  input: {
    width: 300,
    height: 300,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200
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
