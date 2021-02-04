import {put} from 'redux-saga/effects';

import {ApiClient} from '../api/ApiClient';
import {parseComic} from '../models/ComicModel';
import {fetchComicByIdAsync} from '../store/ComicActions';
import {makeApiCall, SuccessResponse} from './Sagas';

export function* fetchComicByIdSaga(
  action: ReturnType<typeof fetchComicByIdAsync.request>,
): Generator {
  const response = yield makeApiCall(ApiClient.fetchComicById, {
    onFailure: fetchComicByIdAsync.failure,
    payload: {id: action.payload.storyId},
  });

  if (response) {
    const {json} = response as SuccessResponse;

    const story = parseComic(json);

    if (story) {
      yield put(fetchComicByIdAsync.success(story));
    } else {
      yield put(fetchComicByIdAsync.failure(new Error('No story found!')));
    }
  }
}
