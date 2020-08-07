import React from 'react';
import {View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {NavBar, Button} from 'galio-framework';

const TopBar = props => {
  return (
    <View>
      <NavBar
        leftIconColor={props.iconColor || 'white'}
        leftStyle={styles.Left}
        left={
          <Button
            onlyIcon
            icon="left"
            iconFamily="antdesign"
            iconSize={24}
            iconColor="white"
            color="transparent"
            activeOpacity={0.5}
            style={styles.BackButton}
            onPress={() => props.navigation.goBack()}>
            Back
          </Button>
        }
        onLeftPress={() => props.navigation.goBack()}
        right={props.right}
        rightStyle={styles.Right}
        title={props.title}
        titleStyle={styles.Title}
        transparent
      />
    </View>
  );
};

export default withNavigation(TopBar);

const styles = StyleSheet.create({
  Title: {
    color: 'white',
    fontSize: 18,
  },
  Left: {
    height: 64,
  },
  Right: {},
});
