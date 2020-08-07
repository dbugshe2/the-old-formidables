import React from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  GalleryContainer: {
    borderBottomLeftRadius: 50,
    backgroundColor: '#ff4e00',
    overflow: 'hidden',
    padding: 3,
  },

  GalleryThumbnail: {},
  GallerySwiper: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainer: {
    padding: 1,
    flex: 1,
    width: width,
    position: 'relative',
  },
  thumbnailStyles: {
    // borderRadius: 100,
    width: width * 0.5,
    height: width * 0.6,
    // width: 200,
    // height: 150,
    borderRadius: 20,
    marginTop: 5,
    marginHorizontal: 2,
  },
  fullImage: {
    width: width,
    // height: '100%'ss,
  },
  closeModal: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
});

export default styles;
