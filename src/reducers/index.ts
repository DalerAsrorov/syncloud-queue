import { combineReducers } from 'redux';
import { mainPlayer } from './main-player';
import { search } from './search';
import { searchPlayer } from './search-players';

export enum Reducers {
  MainPlayer = 'mainPlayer',
  SearchPlayer = 'searchPlayer',
  Search = 'search',
}

const rootReducer = combineReducers({
  [Reducers.SearchPlayer]: searchPlayer,
  [Reducers.MainPlayer]: mainPlayer,
  [Reducers.Search]: search,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
