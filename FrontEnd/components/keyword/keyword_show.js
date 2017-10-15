import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import KeywordItem from './keyword_item';

export default class KeywordShow extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let dreamKeywords = this.props.currentKeywords;
    let keywordItems = dreamKeywords.map(
      (keyword) => <KeywordItem key={keyword.id + 'keyword'} keyword={keyword.keyword}/>
    );

    return (
      <View>
        <Text style={styles.keywordsHeaderText}>
          Keywords:
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {keywordItems}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({

  keywordsHeaderText: {
    color: '#D4CCD9',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  }
});
