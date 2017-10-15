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
  //

  componentDidMount() {

    this.urlString = this.props.string.convert_to_url();
    this.sentimentScore = 0;
    this.sentimentLabel = "";
    this.keywords = [];
    // console.log(this.props);
    let config = {'Authorization': 'Basic ZTI2YTUzMGQtM2YzNy00ODk1LWEzM2MtNDExZGM2NWMwMGE4OkZXdFI3MjFObUpyUg=='};
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
      // console.log(this.sentimentLabel, this.sentimentScore, this.keywords);
    });
    // .catch((error) => {
    //   const { navigate } = this.props.navigation;
    //   Alert.alert(
    //     'Your dream was not long enough for analysis',
    //     'Would you like to continue anyway?',
    //     [
    //       {text: 'Yes', onPress: () => {
    //         console.log("continue anyway");
    //       }},
    //       {text: 'Re-Record', onPress: () => {
    //         navigate('Record');
    //       }, style: 'cancel'},
    //     ],
    //     { cancelable: false }
    //   );
    // });
  }

  render() {
    let keywordShow;
    // let topKeywordShow;
    // console.log(this.keywords);
    if (this.keywords && this.keywords.length > 0) {
      let firstFiveKeys = [this.keywords[0],this.keywords[1],this.keywords[2],this.keywords[3],this.keywords[4]];
      // console.log(firstFiveKeys);
      keywordShow = firstFiveKeys.map(
        (keyword, index) => <SuggestedKeywordItem currentKeywords={this.props.currentKeywords} key={index + "suggestedkey"} keyword = {keyword} requestDream={this.props.requestDream} currentDream={this.props.currentDream} createKeyword={this.props.createKeyword}/>
    );
    }
    let topKeywordShow = [];
    for (let i=0; i< 5; i++) {
      if (this.props.keywords[i]) {
        topKeywordShow.push(
          <SuggestedKeywordItem currentKeywords={this.props.currentKeywords} key={i+"suggestedtopkey"} keyword={this.props.keywords[0].keyword} requestDream={this.props.requestDream} currentDream={this.props.currentDream} createKeyword={this.props.createKeyword}/>
        );
      }
    }

    // if (this.props.keywords[0]) {
    //   let firstFive = [this.props.keywords[0].keyword,this.props.keywords[1].keyword,this.props.keywords[2].keyword,this.props.keywords[3].keyword,this.props.keywords[4].keyword];
    //   topKeywordShow = firstFive.map(
    //     (keyword, index) => <SuggestedKeywordItem currentKeywords={this.props.currentKeywords} key={index + "suggestedkey"} keyword = {keyword} requestDream={this.props.requestDream} currentDream={this.props.currentDream} createKeyword={this.props.createKeyword}/>
    //
    //   );
    // }
    // console.log(topKeywordShow);
    // console.log(topKeywordShow2);

    return (
      <View>

        <Text style={styles.keywordsHeaderText}>
          Suggested Keywords:
        </Text>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>

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
    fontSize: 14,
    marginBottom: 4,
  }
});
