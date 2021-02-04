import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

const LatestComicScreen = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          style={styles.spinner}
        />
      ) : (
        <>
          {' '}
          <Text style={styles.titleText}>TEST</Text>
          <Text style={styles.descriptionText}>TEST</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 18,
  },
  spinner: {},
});

export default LatestComicScreen;
