import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class KeywordItem extends React.Component {

render () {

  return(

  <Text style={{marginHorizontal: 5, color: '#A1BEB4', fontSize: 12}}>
    {this.props.keyword}
  </Text>
  );
}
}
