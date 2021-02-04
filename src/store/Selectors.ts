import {RootState} from 'typesafe-actions';
import {Selector} from 'react-redux';
import {Comic} from '../models/ComicModel';
import {RemoteData} from '../api/RemoteData';

export const comicSelector: Selector<RootState, RemoteData<Comic, Error>> = (
  state: RootState,
) => state.comicData.comic;
