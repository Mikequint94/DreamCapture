import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import KeywordItem from './keyword_item';

export default class KeywordShow extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // let newDream = this.props.requestDream(this.props.currentDream.id);
    // console.log(this.props);
    // console.log(newDream);

  }

  render() {
    let dreamKeywords = this.props.currentKeywords;
    let keywordItems;
    // console.log(dreamKeywords);
    keywordItems = dreamKeywords.map(
      (keyword) => <KeywordItem key={keyword.id + 'keyword'} keyword={keyword}/>
    );

    return (
      <View>
        <Text>Keywords:</Text>
        <View>
        {keywordItems}
        </View>
      </View>
    );
  }
}
