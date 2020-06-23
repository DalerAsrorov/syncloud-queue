import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers/index';
import {
  SearchActionTypes,
  SearchState,
  SET_QUERY_TYPE,
  SET_QUERY_VALUE,
} from '../typings/search-state';

export const setQueryValue = (
  value: SearchState['query']
): SearchActionTypes => ({
  type: SET_QUERY_VALUE,
  payload: value,
});

export const setQueryType = (
  queryType: SearchState['queryType']
): SearchActionTypes => ({
  type: SET_QUERY_TYPE,
  payload: queryType,
});

export type ThunkSearchDispatch = ThunkDispatch<
  RootState,
  undefined,
  SearchActionTypes
>;
