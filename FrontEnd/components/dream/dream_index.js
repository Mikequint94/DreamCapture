import React, { Component } from 'react';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Button, TouchableHighlight,
         Image, SectionList } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from 'react-native-elements'
import moment from 'moment'

export default class DreamIndexScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.props.requestUserDreams(this.props.userId);
  }

  sectionDreams() {
    const dreams = this.props.dreams;
    const reformattedDreams = dreams.map(d => {
      const dreamObj = Object.values(d)[0]
      let dream = {};
      const day = moment(dreamObj.created_at).format('DD');
      const month = moment(dreamObj.created_at).format('MMMM');

      dream['month'] = month;
      dream['day'] = day;
      dream['body'] = dreamObj.body;
      dream['id'] = dreamObj.id;
      return dream;
    });

    const allMonths = reformattedDreams.map(d => d.month);
    const uniqSet = new Set(allMonths);
    const uniqMonths = Array.from(uniqSet)

    const dreamsByMonth = uniqMonths.map(month => {
      return reformattedDreams.filter(d => d.month === month);
    });

    const sectionListData = uniqMonths.map( (month, idx) => {
      let section = {}
      section['data'] = dreamsByMonth[idx];
      section['title'] = month;
      return section;
    });

    console.log(sectionListData);
    return sectionListData;
  };

  dreamList() {
    const dreams = this.props.dreams;
    if (Object.keys(dreams).length === 0
        && dreams.constructor === Object ) {
      return ( <View></View> );
    }

    const dreamList =
      <SectionList
        sections={this.sectionDreams()}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        renderItem={({ item }) => this.renderSectionListItem(item)}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={( item ) => `${item.id}`}
      />
    return dreamList;
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "85%",
          backgroundColor: "#CFD3DA",
          marginLeft: "15%"
        }}
      />
    );
  };

  renderSectionListItem(item) {
    // const dream = Object.values(item)[0];
    // const dayNum = moment(item.day).format('DD');
    const { navigate } = this.props.navigation;
    return (
      <ListItem style={styles.listItem}
        title={`${item.body}`}
        avatar={<Avatar
                  width={30}
                  height={30}
                  title={item.day}
                  titleStyle={{fontSize:20}}
                  overlayContainerStyle={{backgroundColor:'#A1BEB4'}}
                />}
        onPress={() => navigate('DreamShow', {dreamId: item.id})}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <SearchBar
          round
          placeholder='Search dreams'/>
        <View style={styles.recordSection}>
          <TouchableHighlight>
            <Icon name='microphone' size={70} color="white" />
          </TouchableHighlight>
        </View>
        <View style={styles.dreamSection}>

          <List>
            {this.dreamList()}
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  recordSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B264A',
  },
  dreamSection: {
    flex: 3,
  },
  listItem : {
    // flexDirection: 'row'
  }
});
