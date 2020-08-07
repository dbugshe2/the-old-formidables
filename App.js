/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import AppNavigator from './src/navigators/appNavigator';
import GalleryContextProvider from './src/context/GalleryContext';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => SplashScreen.hide());
  return (
    <GalleryContextProvider>
      <AppNavigator />
    </GalleryContextProvider>
  );
};

export default App;
