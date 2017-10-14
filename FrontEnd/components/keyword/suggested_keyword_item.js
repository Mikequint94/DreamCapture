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
    console.log(this.props.currentKeywords);
    console.log(this.props.keyword);
  }

  componentDidMount(){
    if (this.props.currentKeywords.includes(this.props.keyword)) {
      this.setState({show: false});
    }
  }

addKeyword() {
  // console.log(this.props);
  this.props.createKeyword({keyword: this.props.keyword, dream_id: this.props.currentDream})
  .then(() => {
    this.setState({show: false});
    // console.log(this.props);
    this.props.requestDream(this.props.currentDream);
  });
}

render () {
  let suggestedWord;
  if (this.state.show) {
    suggestedWord = (
        <Button
        onPress={this.addKeyword.bind(this)}
        title={this.props.keyword}
        />
    );
  } else {
    suggestedWord = null;
  }
  return(
    <View style={{paddingHorizontal: 3}}>
      {suggestedWord}
    </View>
  );
}
}
