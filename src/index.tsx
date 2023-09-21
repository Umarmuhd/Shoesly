import 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/core';
import { RootNavigator } from '@/navigation';

hydrateAuth();
loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const App = () => {
  let [fontsLoaded] = useFonts({
    UrbanistBold: require('../assets/fonts/UrbanistBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <APIProvider>
          <RootNavigator />
          <FlashMessage position="top" />
        </APIProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
