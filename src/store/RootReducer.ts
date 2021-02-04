import {combineReducers} from 'redux';

import ComicReducer, {INIT_STATE as COMIC_INIT_STATE} from './ComicReducer';

const RootReducer = combineReducers({
  comicData: ComicReducer,
});

export default RootReducer;

export const ROOT_INIT_STATE: ReturnType<typeof RootReducer> = {
  comicData: COMIC_INIT_STATE,
};
