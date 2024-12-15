import { useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DataContext } from '../../components/DataProvider';
import HighlyRated from '../../components/HighlyRated';
import Trending from '../../components/Trending';
import USWine from '../../components/USWines';
import RecentlyVisited from '../../components/RecentlyVisited';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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
