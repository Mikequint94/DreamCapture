import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class NoteShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {note: ""};
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({note: newProps.note});
  }

  componentWillUnmount() {
    if (this.state.note) {
      this.props.createNote({
        body: this.state.note,
        dream_id: this.props.currentDream
      });
    }
    // console.log("creatingNote");
    // console.log(this.state.note);
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);

    return (
      <View>
        <Text style={styles.noteHeaderText}>
          Note:
        </Text>
        <TextInput style={styles.noteInput}
          onChangeText={(note) => this.setState({note})}
          placeholder={"enter note..."}
          placeholderTextColor='rgba(212, 204, 217, 0.7)'
          autoCapitalize={'none'}
          value={this.state.note}
          multiline={true}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create ({

  noteHeaderText: {
    color: '#D4CCD9',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  noteInput: {
    borderColor: 'rgba(212, 204, 217, 0.5)',
    height: 80,
    borderWidth: 1,
    borderRadius: 4,
    color: '#D4CCD9',
    fontSize: 16,
    padding: 5
  },
});
