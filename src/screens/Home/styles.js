import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {DEVICE} from '../../utility/constant';
const {height, width} = DEVICE;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-between',
    height: height * 0.9,
  },
  GalleryButtonContainer: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: 'darkorange',
    width: width * 0.9,
    paddingHorizontal: 35,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  CenterText: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    height: height * 0.6,
    alignSelf: 'center',
  },
  ContactsButtonContainer: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'dodgerblue',
    width: width * 0.9,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  ContactsButtonInner: {},
  aboutBtn: {alignSelf: 'center', marginBottom: 5},
  aboutModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    // opacity: 0.6,
    // height: height,
  },
  aboutModalContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 28,
    borderRadius: 28,
    marginVertical: height * 0.1,
    padding: 20,
    height: height * 0.8,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  modalClose: {
    width: 200,
    marginTop: 10,
  },
});

export default styles;
