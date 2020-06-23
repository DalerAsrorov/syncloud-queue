import {
  setQueryType,
  setQueryValue,
  ThunkSearchDispatch,
} from '../actions/search';
import { fetchSearchedTracks } from '../actions/search-player';
import { APISearchParams } from '../typings/SC';
import {
  SearchActionTypes,
  SearchState,
  SET_QUERY_TYPE,
  SET_QUERY_VALUE,
} from '../typings/search-state';
import { SearchQueryType } from '../utils/search-options';

const INITIAL_STATE: SearchState = {
  query: '',
  queryType: SearchQueryType.Q,
};

export const search = (
  state = INITIAL_STATE,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case SET_QUERY_VALUE:
      return {
        ...state,
        query: action.payload,
      };
    case SET_QUERY_TYPE:
      return {
        ...state,
        queryType: action.payload,
      };
    default:
      return state;
  }
};

export interface MappedSearchDispatch {
  onSetQueryValue(value: SearchState['query']): void;
  onSetQueryType(queryType: SearchState['queryType']): void;
  onFetch(params: APISearchParams, isFetchMore?: boolean): void;
}

export const mapSearchStateToProps = (state: any) => ({
  searchPlayer: state.searchPlayer,
  search: state.search,
});

export const mapSearchDispatchToProps = (
  dispatch: ThunkSearchDispatch
): MappedSearchDispatch => ({
  onSetQueryValue(queryValue: SearchState['query']) {
    dispatch(setQueryValue(queryValue));
  },
  onSetQueryType(queryType: SearchState['queryType']) {
    dispatch(setQueryType(queryType));
  },
  onFetch(params: APISearchParams, isFetchMore: boolean = false) {
    dispatch(fetchSearchedTracks(params, isFetchMore));
  },
});
