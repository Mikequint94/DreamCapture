import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  List,
  ListItem
} from 'react-native';


const DreamIndexItem = ( { dream, parseDate} ) => {
  const dreamObj = dream[0];
  const timeStamp = dreamObj.created_at;
  console.log(dreamObj);

  return(
      <View style={styles.container}>
        <List>
          <FlatList
            data={dreamObj}
            renderItem={ dreamObj => (
              <ListItem
                title={dreamObj.body}
              />
            )}
          />
        </List>
        <View style={styles.dateHeader}>

          <View style={styles.dayNum}>
            <Text> {
              parseDate(timeStamp)[2]
            }</Text>
          </View>
          <View style={styles.body}>
            <Text> {dreamObj.body} </Text>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateHeader: {

  },
  dayNum: {

  }
});

export default DreamIndexItem;
