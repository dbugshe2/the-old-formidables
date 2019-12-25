import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/Home';
import GalleryHomeScreen from '../screens/GalleryHome';
import GalleryPreviewScreen from '../screens/GalleryPreview';
import ContactListScreen from '../screens/ContactList';
import ProfileInfoScreen from '../screens/ProfileInfo';
import ProfilePhotosScreen from '../screens/ProfilePhotos';

const GalleryStack = createStackNavigator({
  GalleryHome: {
    screen: GalleryHomeScreen,
  },
  GalleryPreview: {screen: GalleryPreviewScreen},
});

const ContactStack = createStackNavigator({
  ContactList: {screen: ContactListScreen},
  ProfileInfo: {screen: ProfileInfoScreen},
  ProfilePhotos: {screen: ProfilePhotosScreen},
});

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Contacts: {
      screen: ContactStack,
    },
    Gallery: {
      screen: GalleryStack,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppStack);
