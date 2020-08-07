import React from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  ContactsContainer: {
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  SearchBarContainer: {
    paddingHorizontal: 10,
  },
  SearchBar: {
    borderBottomColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 2,
    width: '70%',
  },
  ListContainer: {
    width: width,
    justifyContent: 'center',
    padding: '1%',
  },
  AvatarContainer: {
    // paddingBottom: '3%',
    marginBottom: 20,
    marginLeft: 10,
  },
  AvatarStyle: {
    borderRadius: 100,
    width: width / 4,
    height: width / 4,
    margin: 2 + '%',
  },
  AvatarName: {
    textAlign: 'center',
  },
});

export default styles;
