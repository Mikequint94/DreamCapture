import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View,
         Image, Alert, TouchableHighlight, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from 'react-native-voice';
import { Button } from 'react-native-elements';

import { NavigationActions } from 'react-navigation';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class RecordScreen extends React.Component {
  static navigationOptions = {
    title: 'Record A Dream',
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
    if (Voice.destroy()) {
      Voice.destroy().then(Voice.removeAllListeners);
    }
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
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  saveDream() {
    const { navigate } = this.props.navigation;
    this.props.createDream({body: this.state.finalResults, user_id: this.props.currentUser})
    .then(
    (response) => {

      navigate('NewDreamShow', {dreamId: response.dream.id,
                             dreamDate: ' ',
                             dreamTime: ' '})
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
    if (this.state.end === "√") {
      topText = (
        <View style={styles.topContainer}>
          <Text style={styles.recordText}>
            Edit and Save
          </Text>
        </View>
      )
      middleTextPic = (
        <View style={styles.middleContainer}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({finalResults: text})}
              value={this.state.finalResults}
              multiline={true}
            />
          </View>
        </View>
      )
      bottomButton = (
        <View style={styles.bottomContainer}>
          <Button
            large
            icon={{name: 'redo'}}
            onPress={this.rerecord.bind(this)}
            title='Re-record'
            fontWeight={'bold'}
            fontSize={20}
            buttonStyle={styles.redoButton}/>
          <Button
            large
            icon={{name: 'check'}}
            onPress={this.saveDream.bind(this)}
            title='Save'
            fontWeight={'bold'}
            fontSize={26}
            buttonStyle={styles.saveButton}/>
        </View>
      )
    }
    if (this.state.started === "") {
      console.log(this.props);
      topText = (
        <View style={styles.topContainer}>
          <Text style={styles.recordText}>
            Record Your Dream
          </Text>
        </View>
      )
      middleTextPic = (
        <View style={styles.middleContainer}>
        </View>
      )
      bottomButton = (
        <View style={styles.bottomContainer}>
          <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
            <Icon name='microphone' size={100} color="white" />
          </TouchableHighlight>
        </View>
      )

    } else if (this.state.end === "") {
      topText = (
        <View style={styles.topContainer}>
          <Text style={styles.recordText}>
            Recording...
           </Text>
        </View>
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
        <View style={styles.bottomContainer}>
          <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
            <Icon name='stop-circle-o' size={100} color="white" />
          </TouchableHighlight>
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#3E3254' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scroll={false}
          contentContainerStyle={styles.container}>
          {topText}
          {middleTextPic}
          {bottomButton}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3254',
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  recordText: {
    fontSize: 36,
    color: '#D4CCD9',
    textAlign: 'center',
  },
  soundwave: {
    width: 300,
    height: 250,
  },
  textInputContainer: {
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    width: 350,
    borderColor: 'rgba(212, 204, 217, 0.25)',
    borderWidth: 1,
    color: '#D4CCD9',
    fontSize: 16,
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
  redoButton: {
    borderRadius: 8,
    backgroundColor: '#99CAB9',
    margin: 6,
    padding: 6,
  },
  saveButton: {
    borderRadius: 10,
    backgroundColor: '#83BFAA',
    margin: 6,
    padding: 8,
  },
});
