import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {RootAction} from 'typesafe-actions';

import {fetchComicByIdAsync} from '../store/ComicActions';
import {hasData} from '../api/RemoteData';
import {comicSelector} from '../store/Selectors';
import {TestIDs} from '../common/TestIDs';

const LatestComicScreen = () => {
  const dispatch = useDispatch<Dispatch<RootAction>>();

  const comicDetailRequest = useSelector(comicSelector);
  const comicData = hasData(comicDetailRequest)
    ? comicDetailRequest.data
    : null;

  useEffect(() => {
    dispatch(fetchComicByIdAsync.request({}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      {comicData ? (
        <>
          <Text style={styles.titleText}>{comicData.title}</Text>
          <Image
            style={styles.comicImage}
            source={{
              uri: comicData.imageUrl,
            }}
            resizeMode={'contain'}
            testID={TestIDs.LatestComicImage}
          />
          <Text style={styles.descriptionText}>{comicData.description}</Text>
        </>
      ) : (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          style={styles.spinner}
          testID={TestIDs.LatestComicLoading}
        />
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
    marginHorizontal: 25,
    marginTop: 25,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    marginHorizontal: 25,
    marginBottom: 25,
    textAlign: 'center',
  },
  spinner: {},
  comicImage: {
    height: 400,
    width: 400,
  },
});

export default LatestComicScreen;
