import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';

export default class SuggestedKeywordItem extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      show: true
    };
  }

addKeyword() {
  this.props.createKeyword({keyword: this.props.keyword, dream_id: this.props.currentDream})
  .then(() => this.setState({show: false}));
}

render () {
  let suggestedWord;
  if (this.state.show) {
    suggestedWord = (
      <View style={{height:34, width: 450}}>
        <Button
        onPress={this.addKeyword.bind(this)}
        title={this.props.keyword}
        />
      <Text>
        {'\n'}
      </Text>
      </View>
    );
  } else {
    suggestedWord = undefined;
  }
  return(
    <View style={{height:34, width: 450}}>
      {suggestedWord}
    </View>
  );
}
}
