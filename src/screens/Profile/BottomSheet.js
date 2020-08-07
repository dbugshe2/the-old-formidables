import React, {Component} from 'react';
import {Animated, StyleSheet, View, Linking} from 'react-native';
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import styles from './styles';
import {ANIMATED, BOTTOM_SHEET} from '../../utility/constant';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Button} from 'galio-framework';
const {USE_NATIVE_DRIVER} = ANIMATED;

export default class BottomSheet extends Component {
  masterdrawer = React.createRef();
  drawer = React.createRef();
  drawerheader = React.createRef();
  scroll = React.createRef();
  constructor(props) {
    super(props);
    const START = BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[0];
    const END =
      BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[
        BOTTOM_SHEET.SNAP_POINTS_FROM_TOP.length - 1
      ];

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

      let destSnapPoint = BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[0];
      for (let i = 0; i < BOTTOM_SHEET.SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[i];
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
    const {user} = this.props;
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[0]}>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{translateY: this._translateY}],
              },
            ]}>
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}>
              <Animated.View style={styles.header}>
                <LinearGradient
                  style={styles.headerGradient}
                  colors={['#1fb3ed', '#116ac5']}
                  useAngle={true}
                  angle={109}
                  angleCenter={{x: 0.5, y: 0.5}}>
                  <View style={styles.gestureArea}>
                    <View style={styles.pullItem} />
                    {/* <Text color="white" muted>
                      Drag / Swipe Up
                    </Text> */}
                  </View>
                </LinearGradient>
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
                      {marginBottom: BOTTOM_SHEET.SNAP_POINTS_FROM_TOP[0]},
                    ]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}>
                    <LinearGradient
                      style={styles.contentGradient}
                      colors={['#1fb3ed', '#116ac5']}
                      useAngle={true}
                      angle={109}
                      angleCenter={{x: 0.5, y: 0.5}}>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Full Name:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.fullName}`}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Nick Name:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {user.hasOwnProperty('nickname')
                          ? `${user.nickname} `
                          : 'No Nickname'}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Email:
                      </Text>
                      {user.hasOwnProperty('email') ? (
                        <Button
                          round
                          shadowless
                          icon="mail"
                          iconFamily="antdesign"
                          iconColor="white"
                          iconSize={30}
                          color="transparent"
                          style={{borderWidth: 1, borderColor: 'white'}}
                          onPress={() =>
                            Linking.openURL(`mailto:${user.email}`)
                          }>
                          {user.email}
                        </Button>
                      ) : (
                        <Text style={styles.ProfileAnswer} p bold color="white">
                          'No email'
                        </Text>
                      )}
                      <Text style={styles.ProfileTitle} muted color="white">
                        Address:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {user.hasOwnProperty('address')
                          ? `${user.address} `
                          : 'No Address'}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Phone Number:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.phoneNumber}`}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Birthday:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.dateOfBirth}`}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Hobbies:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.hobbies}`}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Bio:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.bio}`}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Crush:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.yourCrush} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Best Experience in School
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.bestExperienceInSchool} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Worst Experience in School:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.worstExperience} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Role Model:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.yourRoleModel} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Favorite Quote:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.yourFavQuote} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Ambition/Aspiration:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.yourAmbition} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Biggest Fear:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {`${user.yourBiggestFear} `}
                      </Text>
                      <Text style={styles.ProfileTitle} muted color="white">
                        Comment:
                      </Text>
                      <Text style={styles.ProfileAnswer} p bold color="white">
                        {user.hasOwnProperty('comment')
                          ? `${user.comment} `
                          : 'No comment'}
                      </Text>
                    </LinearGradient>
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
