import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class KeywordItem extends React.Component {

render () {
  // console.log("rendered a keyword!");
  // console.log(this.props.keyword);
  // let keyworditem =
  //
  //   ;
  return(
    <Text style={{marginHorizontal: 5, color: '#A1BEB4', fontSize: 16}}>
      {this.props.keyword}
    </Text>
  );
}
}
