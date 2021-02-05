import {Comic} from '../models/ComicModel';
import {createReducer} from 'typesafe-actions';

import {combineReducers} from 'redux';
import {
  hasData,
  RemoteData,
  NotRequested,
  Loading,
  Failure,
  Success,
  Refreshing,
} from '../api/RemoteData';
import {fetchComicByIdAsync} from './ComicActions';

export const INIT_STATE = {comic: NotRequested};

export const comicReducer = combineReducers({
  comic: createReducer<RemoteData<Comic, Error>>(INIT_STATE.comic)
    .handleAction(fetchComicByIdAsync.request, (state, {payload}) =>
      hasData(state) ? Refreshing(state.data) : Loading,
    )
    .handleAction(fetchComicByIdAsync.success, (_state, {payload}) =>
      Success(payload),
    )
    .handleAction(fetchComicByIdAsync.failure, (_state, {payload}) =>
      Failure(payload),
    ),
});

export default comicReducer;
export type StoryState = ReturnType<typeof comicReducer>;
