import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Wine, Rating, Coordinates} from '../../types';
import DataProvider, { DataContext } from '../../components/DataProvider';
import HighlyRated from '../../components/HighlyRated';
import Trending from '../../components/Trending';
import ItalianWine from '../../components/USWines';

const App = () =>  {
  return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <HighlyRated/>
          <Trending/>
          <ItalianWine/>
        </ScrollView>
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
