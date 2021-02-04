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
    payload: {id: action.payload.comicId},
  });

  if (response) {
    const {json} = response as SuccessResponse;
    const comic = parseComic(json);

    if (comic) {
      yield put(fetchComicByIdAsync.success(comic));
    } else {
      yield put(fetchComicByIdAsync.failure(new Error('No story found!')));
    }
  }
}
