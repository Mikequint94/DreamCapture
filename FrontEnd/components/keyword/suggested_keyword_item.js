import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View
} from 'react-native';

export default class SuggestedKeywordItem extends React.Component {

render () {

  return(

  <Text style={{color: 'blue'}}>
    {'\n'}
    <Button
    style={{backgroundColor: '#a9f5ff'}}
    title={this.props.keyword} />
  </Text>
  );
}
}
