import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import WatsonAnalyzer from './watson';
import KeywordShow from '../keyword/keyword_show';

export default class DreamShowScreen extends React.Component {
  static navigationOptions = {
      title: 'Dream Show',
  };

  constructor(props) {
    super(props);
    this.state = {
      newKey: ""
    };
  }

  componentDidMount(){
    this.props.requestDream(this.props.navigation.state.params.dreamId);
    this.props.requestTopKeywords(37);
  }

  render() {
    let currentDream = this.props.navigation.state.params.dreamId;
    // let analysis = WatsonAnalyzer.analyze(this.props.dreams[currentDream].body)
    // console.log(analysis);
    console.log(this.props);
    // console.log(this.props.dreams[currentDream].body);
    let dreams;
    let watson;
    if (this.props.dreams[currentDream]) {
      dreams = (
        <Text>{this.props.dreams[currentDream].body}</Text>
      )
      watson = (
        <WatsonAnalyzer navigation={this.props.navigation} string={this.props.dreams[currentDream].body} />
      )
    }
    let addkeyword = (
      <Text>
        Add custom keywords:
        <TextInput
          style={{height: 50,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1}}
          onChangeText={(newKey) => this.setState({newKey})}
          placeholder={"enter keyword"}
          autoFocus={true}
          value={this.state.newKey}
          multiline={false}
          onSubmitEditing={() => {
            if (this.state.newKey.length > 0) {
            this.props.createKeyword({keyword: this.state.newKey, dream_id: currentDream})
            this.setState({newKey: ""})
          }
          }}
        />
      </Text>
    )
    return (
      <View>
        {dreams}
        {watson}
        {addkeyword}
      </View>
    )
  }
}
