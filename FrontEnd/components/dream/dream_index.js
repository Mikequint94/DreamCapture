import React, { Component } from 'react';
import { FontAwesome } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Button, TouchableHighlight,
         Image, FlatList } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from 'react-native-elements'
export default class DreamIndexScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.props.requestUserDreams(this.props.userId);
  }

  parseDate(timestamp) {
    const time = timestamp.split('-');
    const year = time[0];
    const month = time[1];
    const day = time[2].slice(0,2);
    return [year, month, day];
  };

  sectionDreams() {
    const dreams = this.props.dreams;
    const reformattedDreams = dreams.map(d => {
      const dreamObj = Object.values(d)[0]
      let dream = {};
      const date = this.parseDate(dreamObj.created_at);
      dream['year'] = date[0];
      dream['month'] = date[1];
      dream['day'] = date[2];
      dream['body'] = dreamObj.body;
      dream['id'] = dreamObj.id;
      dream['user_id'] = dreamObj.user_id;
      return dream;
    });

    const allMonths = reformattedDreams.map(d => d.month);
    const uniqSet = new Set(allMonths);
    const uniqMonths = Array.from(uniqSet)

    const dreamsByMonth = uniqMonths.map(month => {
      return reformattedDreams.filter(d => d.month === month);
    });

    console.log(dreamsByMonth);

    return dreamsByMonth;
  };

  dreamList() {
    const dreams = this.props.dreams;
    if (Object.keys(dreams).length === 0
        && dreams.constructor === Object ) {
      return ( <View></View> );
    }

    const dreamList =
      <FlatList
        data={dreams}
        keyExtractor={this.keyExtractor}
        renderItem={({ item }) => (
          this.renderFlatListItem(item)
        )}
        ItemSeparatorComponent={this.renderSeparator}
        removeClippedSubviews={false}
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

  renderFlatListItem(item) {
    const dream = Object.values(item)[0];
    const timeStamp = dream.created_at;
    const dayNum = this.parseDate(timeStamp)[2];
    const { navigate } = this.props.navigation;
    return (
      <ListItem style={styles.listItem}
        title={`${dream.body}`}
        avatar={<Avatar
                  width={30}
                  height={30}
                  title={dayNum}
                  titleStyle={{fontSize:20}}
                  overlayContainerStyle={{backgroundColor:'#A1BEB4'}}
                />}
        onPress={() => navigate('DreamShow', {dreamId: dream.id})}
      />
    )
  }


  keyExtractor(item){
    const dream = Object.values(item)[0];
    return dream.id;
  }

  renderSectionList() {

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
