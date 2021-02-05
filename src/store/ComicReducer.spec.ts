import {INIT_STATE, comicReducer} from './ComicReducer';
import {fetchComicByIdAsync} from './ComicActions';
import {RemoteDataType} from '../api/RemoteData';

const comic = {
  id: 1,
  title: 'some title',
  description: 'some description',
  imageUrl: 'http://example.com/test.jpg',
};

describe('Comic reducer', () => {
  it('saves a new comic on success', () => {
    const state: any = comicReducer(
      INIT_STATE,
      fetchComicByIdAsync.success(comic),
    );

    expect(state.comic.data).toEqual(comic);
    expect(state.comic.type).toEqual(RemoteDataType.Success);
  });

  it('does not clear data on re-fetch requested', () => {
    const successState: any = comicReducer(
      INIT_STATE,
      fetchComicByIdAsync.success(comic),
    );

    const state: any = comicReducer(
      successState,
      fetchComicByIdAsync.request({}),
    );
    expect(state.comic.data).toEqual(comic);
    expect(state.comic.type).toEqual(RemoteDataType.Refreshing);
  });
});
