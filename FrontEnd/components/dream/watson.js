import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';

import axios from 'axios';
import SuggestedKeywordItem from '../keyword/suggested_keyword_item';


String.prototype.convert_to_url = function() {
  let response = this.split(" ").join("%20");
  return response + "&features=sentiment,keywords";
};

export default class WatsonAnalyzer extends React.Component {

  componentDidMount() {

    this.urlString = this.props.string.convert_to_url();
    this.sentimentScore = 0;
    this.sentimentLabel = "";
    this.keywords = [];
    let config = {'Authorization': 'Basic ZmI5NjVjNzgtYzM3Mi00M2Q2LTkwODYtMmZhMzY0MTQxOTdhOjhVcFVaUWM3UnZjQw=='};
    axios.get(`https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=${this.urlString}`, {
      headers: config
    }
    )
    .then((response) => {
      this.sentimentLabel = response.data.sentiment.document.label;
      this.sentimentScore = response.data.sentiment.document.score;
      response.data.keywords.map(index => {
        this.keywords.push(Object.values(index)[0]);
      });
    });
  }

  render() {
    let keywordShow;
    if (this.keywords && this.keywords.length > 0) {
      let firstFiveKeys = [this.keywords[0],this.keywords[1],this.keywords[2],this.keywords[3],this.keywords[4]];
      keywordShow = firstFiveKeys.map(
        (keyword, index) => <SuggestedKeywordItem currentKeywords={this.props.currentKeywords} key={index + "suggestedkey"} keyword = {keyword} requestDream={this.props.requestDream} currentDream={this.props.currentDream} createKeyword={this.props.createKeyword}/>
    );
    }
    let topKeywordShow = [];
    for (let i=0; i< 5; i++) {
      if (this.props.keywords[i]) {
        topKeywordShow.push(
          <SuggestedKeywordItem currentKeywords={this.props.currentKeywords} key={i+"suggestedtopkey"} keyword={this.props.keywords[i].keyword} requestDream={this.props.requestDream} currentDream={this.props.currentDream} createKeyword={this.props.createKeyword}/>
        );
      }
    }

    return (
      <View>

        <Text style={styles.keywordsHeaderText}>
          Suggested Keywords:
        </Text>
        <View style={{flex: .8, flexDirection: 'row', flexWrap: 'wrap'}}>
        {keywordShow}
        {topKeywordShow}
        </View>
      </View>
    );
}
}

module.exports = WatsonAnalyzer;

const styles = StyleSheet.create({
  suggestedKeys: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  keywordsHeaderText: {
    color: '#D4CCD9',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
  }
});
