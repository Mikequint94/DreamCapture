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
    let currentKeywords = [{id: "", keyword: ""}];
    if (this.props.dreams[currentDream]) {
        currentKeywords = this.props.dreams[currentDream].keywords;
        keywordShow = (
          <KeywordShow currentKeywords={currentKeywords}/>
        )
      }

    let dreams;
    let watsonInfo;
    let watson;
    // console.log(currentKeywords);

    if (this.props.dreams[currentDream]) {
      const dream = this.props.dreams[currentDream];
      const date = moment(dream.created_at).format('MMMM D, YYYY');
      const time = moment(dream.created_at).format('h:mm a')

      dreams = (
        <View style={styles.dreamsContainer}>
          <Text style={styles.date}>
            {date}
          </Text>
          <Text style={styles.time}>
            {time}
          </Text>
          <View style={styles.dreamBodyBox}>
            <Text style={styles.dreamBody}>
              {dream.body}
            </Text>
          </View>
        </View>
      )
      watsonInfo = (
        <WatsonAnalyzer currentKeywords={currentKeywords.map(keyword => keyword.keyword)} requestDream={this.props.requestDream} createKeyword={this.props.createKeyword} currentDream={currentDream} keywords={this.props.keywords} navigation={this.props.navigation} string={this.props.dreams[currentDream].body} />
      )
    }
    if (this.state.loaded) {
      watson = watsonInfo
    } else {
      watson = (
        <Text> Loading </Text>
      )
    }
    let addKeywords = (
      <View style={styles.addKeywordsContainer}>
        <Text style={styles.keywordsHeaderText}>
          Add Keywords
        </Text>
        <TextInput style={styles.keywordsInput}
          onChangeText={(newKey) => this.setState({newKey})}
          placeholder={"enter keyword"}
          placeholderTextColor='rgba(212, 204, 217, 0.7)'
          autoFocus={true}
          autoCapitalize={'none'}
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
      </View>
    )
    return (
      <View style={styles.container}>
        <View style={styles.containerMargin}>
          {dreams}
          {addKeywords}
          <View style={styles.watsonContainer}>
            {watson}
          </View>
          <View style={styles.keywordShowContainer}>

            {keywordShow}
          </View>
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
    backgroundColor: '#3E3254',
  },
  containerMargin: {
    margin: 12,
  },
  dreamsContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B7A3C6',
    marginBottom: 2,
  },
  time: {
    fontSize: 18,
    color: '#D4CCD9',
    marginBottom: 8,
  },
  dreamBodyBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(212, 204, 217, 0.25)',
    marginBottom: 5,
  },
  dreamBody: {
    color: '#D4CCD9',
    margin: 5,
  },
  addKeywordsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  keywordsHeaderText: {
    color: '#D4CCD9',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  keywordsInput: {
    height: 50,
    borderColor: 'rgba(212, 204, 217, 0.5)',
    borderWidth: 1,
    borderRadius: 4,
    color: '#D4CCD9',
    fontSize: 14,
    padding: 5
  },
  watsonContainer: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  keywordShowContainer: {
    flex: 2,
    // color: '#D4CCD9',
  }
});
