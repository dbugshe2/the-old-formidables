import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import HomeScreen from '../screens/Home';
import GalleryHomeScreen, {GalleryFullImage} from '../screens/GalleryHome';
import ContactListScreen from '../screens/ContactList';
import ProfileScreen from '../screens/Profile';
import {fromTop, fromBottom} from 'react-navigation-transitions';

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === 'Home' &&
    nextScene.route.routeName === 'GalleryHome'
  ) {
    return fromTop(900);
  } else if (
    prevScene &&
    prevScene.route.routeName === 'Home' &&
    nextScene.route.routeName === 'ContactList'
  ) {
    return fromBottom(900);
  }
};

const AppStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Home: {
      screen: HomeScreen,
    },
    Gallery: {
      screen: GalleryHomeScreen,
    },
    Contacts: {screen: ContactListScreen},
    Profile: {screen: ProfileScreen},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    },
    transitionConfig: nav => handleCustomTransition(nav),
  },
);
const GalleryStack = createStackNavigator(
  {
    GalleryFullImage,
    AppStack,
  },
  {
    initialRouteName: 'AppStack',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(GalleryStack);
