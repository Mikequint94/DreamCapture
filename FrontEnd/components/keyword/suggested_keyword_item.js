import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from 'react-native';

export default class SuggestedKeywordItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state ={
      show: true
    };
  }

  componentDidMount(){
    let keyword = this.props.keyword;
    if (keyword) {
      keyword = keyword.toLowerCase();
    }
    console.log(keyword);
    if (this.props.currentKeywords.includes(keyword)) {
      this.setState({show: false});
      // console.log(this.props.keyword.toLowerCase());
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
  // console.log(this.props);
  if (this.state.show && this.props.keyword) {
    suggestedWord = (
      <TouchableOpacity style={{marginHorizontal: 4}}
        onPress={this.addKeyword.bind(this)}>
        <Text style={{fontSize: 14, color: 'white', textAlign: 'center', borderRadius: 7, borderWidth: 1, borderColor: 'blue'}}> {this.props.keyword} </Text>
      </TouchableOpacity>
    );
  } else {
    suggestedWord = null;
  }
  return(
    <View>
      {suggestedWord}
    </View>
  );
}
}
