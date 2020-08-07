import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const windowHeight = height;
const windowWidth = width;

export const ANIMATED = {
  HIDDEN: -350,
  FULL_OPEN: -100,
  VISIBLE: -300,
  USE_NATIVE_DRIVER: true,
};

export const BOTTOM_SHEET = {
  HEADER_HEIGHT: 50,
  windowHeight: height,
  windowWidht: width,
  SNAP_POINTS_FROM_TOP: [
    windowHeight * 0.4,
    windowHeight * 0.6,
    windowHeight * 0.9,
  ],
};

export const DEVICE = {
  width: width,
  height: height,
};
