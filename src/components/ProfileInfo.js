import React, {Component} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
  FlatList,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import {Ionicons} from 'react-native-vector-icons';
// import {SIZES, COLORS} from '../utils/theme';
import {Text} from 'galio-framework';

const {width, height} = Dimensions.get('window');
const HEADER_HEIGHT = 70;
const SNAP_POINTS_FROM_TOP = [70, height * 0.9];
const USE_NATIVE_DRIVER = true;

export default class ProfileInfo extends Component {
  masterdrawer = React.createRef();
  drawer = React.createRef();
  drawerheader = React.createRef();
  scroll = React.createRef();
  constructor(props) {
    super(props);
    const START = SNAP_POINTS_FROM_TOP[0];
    const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1];

    this.state = {
      lastSnap: END,
    };

    this._lastScrollYValue = 0;
    this._lastScrollY = new Animated.Value(0);
    this._onRegisterLastScroll = Animated.event(
      [{nativeEvent: {contentOffset: {y: this._lastScrollY}}}],
      {useNativeDriver: USE_NATIVE_DRIVER},
    );
    this._lastScrollY.addListener(({value}) => {
      this._lastScrollYValue = value;
    });

    this._dragY = new Animated.Value(0);
    this._onGestureEvent = Animated.event(
      [{nativeEvent: {translationY: this._dragY}}],
      {useNativeDriver: USE_NATIVE_DRIVER},
    );

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY,
    );

    this._translateYOffset = new Animated.Value(END);
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY),
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    });
  }
  _onHeaderHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0);
    }
    this._onHandlerStateChange({nativeEvent});
  };
  _onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {velocityY, translationY} = nativeEvent;
      translationY -= this._lastScrollYValue;
      const dragToss = 0.05;
      const endOffsetY =
        this.state.lastSnap + translationY + dragToss * velocityY;

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i];
        const distFromSnap = Math.abs(snapPoint - endOffsetY);
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint;
        }
      }
      this.setState({lastSnap: destSnapPoint});
      this._translateYOffset.extractOffset();
      this._translateYOffset.setValue(translationY);
      this._translateYOffset.flattenOffset();
      this._dragY.setValue(0);
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    }
  };
  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: width,
          }}
          pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{translateY: this._translateY}],
                borderRadius: 30,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
              },
            ]}>
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}>
              <Animated.View style={styles.header}>
                <Text primary h3>
                  Analytic
                </Text>
                <TouchableOpacity style={styles.dateSelect}>
                  <Text small>Mar 18 - Mar 22</Text>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}>
              <Animated.View style={styles.container}>
                <NativeViewGestureHandler
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}>
                  <Animated.ScrollView
                    style={[
                      styles.scrollView,
                      {marginBottom: SNAP_POINTS_FROM_TOP[0]},
                    ]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}>
                    <Text white>
                      Feminist women love Eminem. "Chicka, chicka, chicka, Slim
                      Shady, I'm sick of him. Look at him, walkin' around,
                      grabbin' his you-know-what. Flippin' the you-know-who,"
                      "Yeah, but he's so cute though.". Yeah, I probably got a
                      couple of screws up in my head loose. But no worse than
                      what's goin' on in your parents' bedrooms.
                    </Text>
                    <Text primary subtitle>
                      RECENT TRANSACTION
                    </Text>
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 8,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dateSelect: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
  },
});
