import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Wine, Rating, Coordinates} from './types';
import DataProvider, { DataContext } from './components/DataProvider';
import WineCollection from './components/WineCollection';

const App = () =>  {
  return (
    <DataProvider>
      <View style={styles.container}>
        <WineCollection/>
      </View>
    </DataProvider>
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
