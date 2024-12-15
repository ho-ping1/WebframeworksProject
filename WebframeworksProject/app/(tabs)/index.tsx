import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Wine, Rating, Coordinates} from '../../types';
import DataProvider, { DataContext } from '../../components/DataProvider';
import HighlyRated from '../../components/HighlyRated';
import Trending from '../../components/Trending';
import USWine from '../../components/USWines';
import RecentlyVisited from '../../components/RecentlyVisited';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const App = () =>  {
  const { appIsReady } = useContext(DataContext);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
}, [appIsReady]);

if (!appIsReady) {
    return null;
}
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <HighlyRated/>
          <Trending/>
          <USWine/>
          <RecentlyVisited/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
});

export default App;
