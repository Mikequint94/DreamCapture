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

  componentWillMount() {
    if (this.props.note) {
      console.log("note", this.props.note);
      this.setState({note: this.props.note});
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({note: newProps.note});
  }

  saveNote(note) {
    this.setState({note});
    setTimeout(() => {
      console.log(this.state.note);
      this.props.createNote({
        body: this.state.note,
        dream_id: this.props.currentDream
      });
    }, 100);
  }

  render() {
    return (
      <View>
        <Text style={styles.noteHeaderText}>
          Note:
        </Text>
        <TextInput style={styles.noteInput}
          onChangeText={(note) => this.saveNote(note)}
          placeholder={"enter note..."}
          placeholderTextColor='rgba(212, 204, 217, 0.7)'
          autoCapitalize={'none'}
          value={this.state.note}
          multiline={false}
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
    height: 26,
    borderWidth: 1,
    borderRadius: 4,
    color: '#D4CCD9',
    fontSize: 16,
    padding: 5
  },
});
