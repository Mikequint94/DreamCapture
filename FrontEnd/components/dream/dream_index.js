import React, { Component } from 'react';
import { FontAwesome } from 'react-native-vector-icons';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Platform, Text, View, Button, TouchableHighlight,
         Image, SectionList } from 'react-native';
import { SearchBar, List, ListItem, Avatar } from 'react-native-elements'
import moment from 'moment'

export default class DreamIndexScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.props = nextProps;
    }
  }

  componentDidMount() {
    this.props.requestUserDreams(this.props.userId);
  }

  searchBar() {
    return (
      <SearchBar
        round
        placeholder='Search dreams'
        placeholderTextColor='#D4CCD9'
        icon={{color: '#D4CCD9'}}
        ref={search => this.search = search}
        containerStyle = {styles.searchBar}
        inputStyle = {styles.searchBarInput}
        onChangeText={text => this.searchDreams(text)}/>
    )
  }

  searchDreams(text) {
    if (text === "") {
      this.props.requestUserDreams(this.props.userId);
    } else {
      this.props.requestSearchDreams(this.props.userId, text);
    }
  }
  sectionDreams() {
    const dreams = Object.values(this.props.dreams);
    const reformattedDreams = dreams.map(d => {
      const dreamObj = Object.values(d)[0]
      let dream = {};
      const day = moment(dreamObj.created_at).format('DD');
      const month = moment(dreamObj.created_at).format('MMMM');
      const year = moment(dreamObj.created_at).format('YYYY');
      const date = moment(dreamObj.created_at).format('MMMM D, YYYY');
      const time = moment(dreamObj.created_at).format('h:mm a')

      dream['year'] = year;
      dream['month'] = month;
      dream['day'] = day;
      dream['date'] = date;
      dream['time'] = time;
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
      section['title'] = `${month} ${dreamsByMonth[idx][0].year}`;
      return section;
    });

    return sectionListData;
  };


  onRefresh() {
    this.setState({refreshing: true});
    this.props.requestUserDreams(this.props.userId).then(() => {
      this.setState({refreshing: false});
    });
  }

  dreamList() {
    const dreams = this.props.dreams;

    const dreamList =
      <SectionList
        sections={this.sectionDreams()}
        renderSectionHeader={({ section }) =>
          <Text style={styles.sectionHeader}>{section.title}</Text>}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => this.renderSectionListItem(item)}
        keyExtractor={( item ) => `${item.id}`}
        ListHeaderComponent={false}
        ItemSeparatorComponent={this.renderItemSeparator}
        SectionSeparatorComponent={this.renderSectionSeparator}
        ListEmptyComponent={this.renderEmptyList(this.search)}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
      />
    return dreamList;
  }

  renderItemSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: 'rgba(62,50,84,.2)',
          marginLeft: "0%"
        }}
      />
    );
  };

  renderSectionSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: 'rgba(62,50,84,.3)',
          marginLeft: "0%"
        }}
      />
    );
  };

  renderSectionListItem(item) {
    const { navigate } = this.props.navigation;
    if (item.body) {
      return (
        <ListItem style={styles.listItem}
          key={item.id + Date.now()}
          title={item.body}
          titleNumberOfLines={2}
          avatar={<Avatar
                    width={30}
                    height={30}
                    title={item.day}
                    titleStyle={{fontSize:20,
                      fontWeight:'bold', color: '#3B264A'}}
                    overlayContainerStyle={{
                      backgroundColor:'white'}}
                  />}
          onPress={() => navigate('DreamShow', {
                                    dreamId: item.id,
                                    dreamDate: item.date,
                                    dreamTime: item.time } )}
        />
      )
  } else {
    return (
      <Text/>
    )
  }
  }

  renderEmptyList(search) {
    let noDreamsText = (
      <Text style={styles.emptyListText}>
        Welcome! Get started by pressing the record icon to record
        your first dream. {"\n"} {"\n"}
        You can also set push notifications for a reminder to record a
        dream when you wake up.
      </Text>
    )
    if (search && search.input._lastNativeText) {
      noDreamsText = (
        <Text style={styles.emptyListText}>
          No matching dreams found
        </Text>
      )
    }
    return(
      <View style={styles.emptyList}>
        {noDreamsText}
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.topPadding}>
        </View>

        {this.searchBar()}

        <View style={styles.recordSection}>
          <TouchableHighlight onPress={() => navigate('Record')}>
            <Icon name='microphone' size={70} color="white" />
          </TouchableHighlight>
        </View>

        <View style={styles.dreamSection}>
          <List containerStyle={{marginTop: 1}}>
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
  topPadding: {
    backgroundColor: '#3E3254',
    height: Platform.OS === 'ios' ? 20: 10,
  },
  searchBar: {
    backgroundColor: '#3E3254',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: '#362554',
  },
  recordSection: {
    ...Platform.select({
      android: {
        height: 90
      },
      ios: {
        flex: 1
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E3254',
  },
  dreamSection: {
    flex: 4,
  },
  sectionHeader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B264A',
  },
  listItem: {
    marginVertical: 5,
  },
  emptyList: {
    backgroundColor: '#E9E9EF',
    padding: 10
  },
  emptyListText: {
    color: '#3B264A',
    fontSize: 20,
  }
});
