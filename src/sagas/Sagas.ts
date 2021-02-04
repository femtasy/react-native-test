import {put, takeEvery, all, call, race, delay} from 'redux-saga/effects';
import {Action} from 'redux';

import {fetchComicByIdAsync} from '../store/ComicActions';
import {fetchComicByIdSaga} from './ComicSagas';

export type SuccessResponse = {json: object; headers: Headers};

const API_TIMEOUT = 10000;

type CommonApiCallOpts = {
  onFailure: (err: Error) => Action;
  ignore401Errors?: boolean;
  ignoreJsonResponse?: boolean;
};

export function* makeApiCall<TPayload>(
  apiRequest: (payload: TPayload) => Response | unknown,
  opts: CommonApiCallOpts & {payload: TPayload},
): Generator<unknown, SuccessResponse | undefined> {
  const {onFailure, payload} = opts;

  try {
    const {apiResponse, timeout} = (yield race({
      apiResponse: call(apiRequest, payload),
      timeout: delay(API_TIMEOUT),
    })) as {apiResponse: Response | undefined; timeout: boolean};

    if (timeout) {
      throw new Error('Request timed out.');
    }

    const headers = apiResponse?.headers;

    if (!apiResponse || !headers) {
      const error = new Error('no API response or headers');
      throw error;
    } else {
      if (apiResponse.status >= 300) {
        const message = `Server returned ${
          apiResponse.status
        } code! Response: ${tryJson(apiResponse)}`;
        throw new Error(message);
      } else {
        const parsedResponse = (yield apiResponse.json()) as
          | object
          | {errors: String[]};

        if (parsedResponse.hasOwnProperty('errors')) {
          const errorJSON = parsedResponse as {errors: String[]};

          throw new Error(errorJSON.errors.join(', '));
        } else {
          const json = parsedResponse as object;

          return {json, headers};
        }
      }
    }
  } catch (error) {
    console.log('[MakeApiCall] Error:', error);
    yield put(onFailure(error));
    return undefined;
  }
}

const tryJson = async (response: Response) => {
  try {
    const json = await response.json();
    return JSON.stringify(json);
  } catch {
    return 'unparsable';
  }
};

function* mainSaga() {
  yield all([takeEvery(fetchComicByIdAsync.request, fetchComicByIdSaga)]);
}

export default mainSaga;
