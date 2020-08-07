import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PageWrapper = props => {
  return (
    <LinearGradient
      colors={['#C64DCE', '#9E68D8', '#6B8DE7']}
      useAngle={true}
      angle={157}
      angleCenter={{x: 0.5, y: 0.5}}
      style={styles.GradientContainer}>
      {props.children}
    </LinearGradient>
  );
};

export default PageWrapper;

export const styles = StyleSheet.create({
  GradientContainer: {
    ...StyleSheet.absoluteFill,
    flex: 1,
  },
});
