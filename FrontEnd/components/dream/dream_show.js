import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import WatsonAnalyzer from './watson';
import KeywordShow from '../keyword/keyword_show';
import moment from 'moment'

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

  parseDate(timestamp) {
    const time = timestamp.split('-');
    const year = time[0];
    const month = time[1];
    const day = time[2].slice(0,2);
    return [year, month, day];
  };

  render() {
    let currentDream = this.props.navigation.state.params.dreamId;
    // let analysis = WatsonAnalyzer.analyze(this.props.dreams[currentDream].body)
    // console.log(analysis);
    console.log(this.props);
    // console.log(this.props.dreams[currentDream].body);

    let dreams;
    let watson;

    if (this.props.dreams[currentDream]) {
      const dream = this.props.dreams[currentDream];
      console.log(dream);

      const formattedDate = moment(dream.created_at).format('MMMM D, YYYY');

      dreams = (
        <View>
          <Text style={styles.day}>
            {formattedDate}
          </Text>
          <Text>{dream.body}</Text>
        </View>
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
      <View style={styles.container}>
        <View style={styles.dreamsContainer}>
          {dreams}
        </View>
        <View style={styles.watsonContainer}>
          {watson}
        </View>
        <View style={styles.addKeywordsContainer  }>
          {addkeyword}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dreamsContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3254',
  },
  date: {

  },
  watsonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  addKeywordsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
});
