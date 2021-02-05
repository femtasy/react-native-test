import React from 'react';

import {renderWithStore} from '../utilities/TestHelpers';
import LatestComicScreen from './LatestComicScreen';
import {TestIDs} from '../common/TestIDs';
import {RemoteDataType} from '../api/RemoteData';

const comic = {
  id: 1,
  title: 'Some mock title',
  image: 'http://example.com/test.jpg',
  description: 'Some mock description',
};

const comicStore = {
  comicData: {
    comic: {
      type: RemoteDataType.Success,
      data: comic,
    },
  },
};

describe('LatestComicScreen', () => {
  describe('when comic is available', () => {
    it('renders the comic', async () => {
      const {getByText, getByTestId} = renderWithStore(<LatestComicScreen />, {
        state: comicStore,
      });

      expect(getByText(comic.title)).toBeDefined();
      expect(getByText(comic.description)).toBeDefined();
      expect(getByTestId(TestIDs.LatestComicImage)).toBeDefined();
    });
  });

  describe('when no comic is available', () => {
    it('renders the loading spinner', async () => {
      const {getByTestId} = renderWithStore(<LatestComicScreen />, {
        state: {comicData: {comic: {type: RemoteDataType.Loading}}},
      });

      expect(getByTestId(TestIDs.LatestComicLoading)).toBeDefined();
    });
  });
});
