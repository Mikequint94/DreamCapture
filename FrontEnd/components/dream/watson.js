import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';

import axios from 'axios';


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
    })
    .catch((error) => {
      const { navigate } = this.props.navigation;
      Alert.alert(
        'Your dream was not long enough for analysis',
        'Would you like to continue anyway?',
        [
          {text: 'Yes', onPress: () => {
            console.log("continue anyway");
          }},
          {text: 'Re-Record', onPress: () => {
            navigate('Record');
          }, style: 'cancel'},
        ],
        { cancelable: false }
      );
    });
  }

  render() {
    let keywordShow;
    if (this.keywords) {
      keywordShow = (
        <View style={styles.suggestedKeys}>
          <Text>{this.keywords[0]}</Text>
          <Text>{this.keywords[1]}</Text>
          <Text>{this.keywords[2]}</Text>
          <Text>{this.keywords[3]}</Text>
          <Text>{this.keywords[4]}</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>
          Sentiment Score: {this.sentimentScore}
        </Text>
        <Text>
          Sentiment Label: {this.sentimentLabel}
        </Text>
        <Text>
          Suggested Keywords:
          {keywordShow}
        </Text>
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
    height: 300,
    borderColor: 'gray',
    borderWidth: 1
  }
});
