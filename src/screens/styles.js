import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const globalStyles = StyleSheet.create({
  Page: {
    height: height - 90,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    // elevation: 1,
  },
  InnerPage: {
    height: height - 70,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
  },
  TopBar: {
    height: 80,
    alignItems: 'center',
  },
  TopBarHeader: {
    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    flex: 1,
  },
});

export default globalStyles;
