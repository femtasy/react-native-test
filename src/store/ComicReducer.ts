import {Comic} from '../models/ComicModel';
import {createReducer} from 'typesafe-actions';

import {combineReducers} from 'redux';
import {
  RemoteData,
  NotRequested,
  Loading,
  Failure,
  Success,
} from '../api/RemoteData';
import {fetchComicByIdAsync} from './ComicActions';

export const INIT_STATE = {story: NotRequested};

export const storyReducer = combineReducers({
  story: createReducer<RemoteData<Comic, Error>>(INIT_STATE.story)
    .handleAction(fetchComicByIdAsync.request, () => Loading)
    .handleAction(fetchComicByIdAsync.success, (_state, {payload}) =>
      Success(payload),
    )
    .handleAction(fetchComicByIdAsync.failure, (_state, {payload}) =>
      Failure(payload),
    ),
});

export default storyReducer;
export type StoryState = ReturnType<typeof storyReducer>;
