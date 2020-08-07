import {StyleSheet} from 'react-native';

import {BOTTOM_SHEET, DEVICE} from '../../utility/constant';

const {width} = DEVICE;
const styles = StyleSheet.create({
  ProfileBackground: {
    ...StyleSheet.absoluteFillObject,
    marginTop: BOTTOM_SHEET.windowHeight * 0.1,
    backgroundColor: 'transparent',
    width: width,
    borderTopRightRadius: 50,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6.65,
    // elevation: 3,
  },
  ProfilePic: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    width: width,
    borderTopRightRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.65,
    elevation: 5,
  },
  header: {
    backgroundColor: 'gray',
    height: BOTTOM_SHEET.HEADER_HEIGHT,
    borderTopRightRadius: 48,

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 11,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4.65,
    elevation: 12,
  },
  headerGradient: {
    height: BOTTOM_SHEET.HEADER_HEIGHT,
    borderTopRightRadius: 48,
  },
  contentGradient: {
    // borderTopRightRadius: 48,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  gestureArea: {
    width: width,
    height: BOTTOM_SHEET.HEADER_HEIGHT,

    // marginTop: -10,
    // position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',
  },
  pullItem: {
    width: 80,
    height: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    opacity: 0.7,
    marginBottom: 5,
  },
  ProfileTitle: {
    marginBottom: 5,
    fontWeight: '100',
  },
  ProfileAnswer: {
    marginBottom: 20,
  },
});
export default styles;
