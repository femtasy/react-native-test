import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LatestComicScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TEST</Text>
      <Text style={styles.descriptionText}>TEST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  descriptionText: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 18,
  },
});

export default LatestComicScreen;
