import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const DreamIndexItem = ( { dream } ) => {
  const dreamObj = dream[0];
  console.log(dreamObj);
  return(
      <View>
        <Text> {dreamObj.body} </Text>
      </View>
    );
};


export default DreamIndexItem;
