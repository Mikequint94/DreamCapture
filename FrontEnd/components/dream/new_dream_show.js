import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback,
         Keyboard, View, Button, Dimensions, ScrollView
       } from 'react-native';

import WatsonAnalyzer from './watson';
import KeywordShow from '../keyword/keyword_show';
import NoteShowContainer from '../note/note_show_container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { NavigationActions } from 'react-navigation';


export default class NewDreamShowScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newKey: "",
      loaded: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `New Dream`,
    headerLeft: null,
    headerRight: <Button
      onPress={() => navigation.navigate("Home")}
      title='Save'
      color='#D4CCD9'
      />
  });

  componentDidMount(){
    this.props.requestDream(this.props.navigation.state.params.dreamId);
    this.props.requestTopKeywords(this.props.currentUser);
    this.props.navigation.setParams({dreamDate: this.props.dreamDate})
    let myThis = this;
    setTimeout(function () {
      myThis.setState({loaded: true});
    }, 100)
    setTimeout(function () {
      myThis.setState({loaded: true});
    }, 1100)
  }

  render() {

    let currentDream = this.props.navigation.state.params.dreamId;

    let keywordShow;
    let note = undefined;
    let noteShow;
    let currentKeywords = [{id: "", keyword: ""}];
    if (this.props.dreams[currentDream]) {
        note = this.props.dreams[currentDream].note;
        currentKeywords = this.props.dreams[currentDream].keywords;
        keywordShow = (
          <KeywordShow currentKeywords={currentKeywords}/>
        )
      }
    if (note) {
      noteShow = (
        <NoteShowContainer currentDream={currentDream} note={note.body}/>
      );
    } else {
      noteShow = (
        <NoteShowContainer currentDream={currentDream}/>
      )
    }

    let dreams;
    let watsonInfo;
    let watson;

    if (this.props.dreams[currentDream]) {
      const dream = this.props.dreams[currentDream];
      const time = this.props.dreamTime;

      dreams = (
        <View style={styles.dreamsContainer}>
          <Text style={styles.time}>
            {time}
          </Text>
          <View style={styles.dreamBodyBox}>
            <ScrollView>
            <Text style={styles.dreamBody}>
              {dream.body}
            </Text>
          </ScrollView>
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
          autoFocus={false}
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
      <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#3E3254' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}>
            <View style={styles.containerMargin}>
            {dreams}
            {addKeywords}
            <View style={styles.watsonContainer}>
              <ScrollView>
              {watson}
            </ScrollView>
            </View>
            <View style={styles.keywordShowContainer}>
              {keywordShow}
            </View>
            <View style={styles.keywordShowContainer}>
              <ScrollView>
                {noteShow}
              </ScrollView>
            </View>
          </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
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
  time: {
    fontSize: 20,
    fontWeight: '600',
    color: '#B7A3C6',
    marginBottom: 8,
  },
  dreamBodyBox: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(212, 204, 217, 0.4)',
    marginBottom: 5,
  },
  dreamBody: {
    flex: 1,
    color: '#D4CCD9',
    margin: 5,
    fontSize: 16,
  },
  addKeywordsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  keywordsHeaderText: {
    color: '#D4CCD9',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  keywordsInput: {
    height: 50,
    borderColor: 'rgba(212, 204, 217, 0.4)',
    borderWidth: 1,
    borderRadius: 4,
    color: '#D4CCD9',
    fontSize: 16,
    marginBottom: 6,
  },
  watsonContainer: {
    flex: 1.4,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  keywordShowContainer: {
    flex: .8,
    width: (Dimensions.get('window').width - 23)
  },
  notesShowContainer: {
    flex: 1.4,
    width: (Dimensions.get('window').width - 23)
  }
});
