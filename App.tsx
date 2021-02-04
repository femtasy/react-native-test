import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Provider as PaperProvider} from 'react-native-paper';

import withRedux from './src/hooks/withRedux';
import LatestComic from './src/components/LatestComicScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <PaperProvider>
          <LatestComic />
        </PaperProvider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const AppWithStore = _.flowRight(withRedux)(App);
export default AppWithStore;
