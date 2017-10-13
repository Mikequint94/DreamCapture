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
      watson = (
        <WatsonAnalyzer navigation={this.props.navigation}
          string={this.props.dreams[currentDream].body} />
      )
    }
    let addKeywords = (
      <View style={styles.addKeywordsContainer}>
        <Text style={styles.keywordsHeaderText}>
          Add Keywords
        </Text>
        <TextInput style={styles.keywordsInput}
          onChangeText={(newKey) => this.setState({newKey})}
          placeholder={"enter keywords separated by ;"}
          placeholderTextColor='rgba(212, 204, 217, 0.7)'
          autoFocus={true}
          autoCapitalize={'none'}
          value={this.state.newKey}
          multiline={true}
          onSubmitEditing={() => {
            if (this.state.newKey.length > 0) {
              this.props.createKeyword({keyword: this.state.newKey, dream_id: currentDream})
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
    flex: 1,
    borderColor: 'rgba(212, 204, 217, 0.5)',
    borderWidth: 1,
    borderRadius: 4,
    color: '#D4CCD9',
    fontSize: 14,
    padding: 5
  },
  watsonContainer: {
    flex: 2,
    // overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
