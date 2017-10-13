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
      newKey: "",
      loaded: false
    };
  }

  componentDidMount(){
    this.props.requestDream(this.props.navigation.state.params.dreamId);
    this.props.requestTopKeywords(this.props.currentUser);
    let myThis = this;
    setTimeout(function () {
      myThis.setState({loaded: true});
    }, 100)
    setTimeout(function () {
      myThis.setState({loaded: true});
    }, 1100)
  }

  render() {
    // if (this.state.newKey === "") {
    // this.props.requestDream(this.props.navigation.state.params.dreamId);
    // }

    let currentDream = this.props.navigation.state.params.dreamId;

    let keywordShow;
    // console.log(this.props.dreams[currentDream]);
    if (this.props.dreams[currentDream]) {
        keywordShow = (
          <KeywordShow currentKeywords={this.props.dreams[currentDream].keywords}/>
        )
      }

    let dreams;
    let watsonInfo;
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
      watsonInfo = (
        <WatsonAnalyzer createKeyword={this.props.createKeyword} currentDream={currentDream} keywords={this.props.keywords} navigation={this.props.navigation} string={this.props.dreams[currentDream].body} />
      )
    }
    if (this.state.loaded) {
      watson = watsonInfo
    } else {
      watson = (
        <Text> Loading </Text>
      )
    }
    let addkeyword = (
      <Text>
        Add custom keywords:
        <TextInput
          style={{height: 34,
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
            .then(() => this.props.requestDream(this.props.navigation.state.params.dreamId));
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

      <View style={styles.container}>
          {dreams}
          {watson}
        <View style={styles.addKeywordsContainer  }>
          {addkeyword}
        </View>
        {keywordShow}
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
