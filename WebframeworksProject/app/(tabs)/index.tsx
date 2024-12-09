import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Wine, Rating, Coordinates} from '../../types';
import DataProvider, { DataContext } from '../../components/DataProvider';
import HighlyRated from '../../components/HighlyRated';
import Trending from '../../components/Trending';
import NewlyAdded from '../../components/NewlyAdded';

const App = () =>  {
  return (
      <View style={styles.container}>
        <HighlyRated/>
        <Trending/>
        <NewlyAdded/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
