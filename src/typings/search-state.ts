import { SearchQueryType } from '../utils/search-options';

export interface SearchState {
  query: string;
  queryType: SearchQueryType;
}

export const SET_QUERY_TYPE = 'SET_QUERY_TYPE';
export const SET_QUERY_VALUE = 'SET_QUERY_VALUE';

interface SetQueryValue {
  type: typeof SET_QUERY_VALUE;
  payload: SearchState['query'];
}

interface SetQueryType {
  type: typeof SET_QUERY_TYPE;
  payload: SearchState['queryType'];
}

export type SearchActionTypes = SetQueryValue | SetQueryType;
