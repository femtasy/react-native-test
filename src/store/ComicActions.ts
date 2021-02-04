import {Comic} from '../models/ComicModel';
import {createAsyncAction} from 'typesafe-actions';

export const fetchComicByIdAsync = createAsyncAction(
  'FETCH_STORY_BY_ID_START',
  'FETCH_STORY_BY_ID_SUCCESS',
  'FETCH_STORY_BY_ID_FAILURE',
)<{comicId?: number}, Comic, Error>();
