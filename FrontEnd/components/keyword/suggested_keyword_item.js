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
    this.state ={
      show: true
    };
  }

  componentDidMount(){
    let keyword = this.props.keyword;
    if (keyword) {
      keyword = keyword.toLowerCase();
    }
    if (this.props.currentKeywords.includes(keyword)) {
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
  // console.log(this.props);
  if (this.state.show && this.props.keyword) {
    suggestedWord = (
      <TouchableOpacity style={styles.suggestedKey}
        onPress={this.addKeyword.bind(this)}>
        <Text style={{fontSize: 14, color: '#3E3254', textAlign: 'center'}}> {this.props.keyword} </Text>
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

const styles = StyleSheet.create ({
  suggestedKey: {
    marginVertical: 2,
    marginHorizontal: 4,
    padding: 2,
    backgroundColor: '#D4CCD9',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
