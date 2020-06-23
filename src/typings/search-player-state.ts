import { Track, NextHref, APISearchParams } from './SC';

export interface SearchPlayerState {
  tracks: Track[];
  nextHref: NextHref;
  limit: number;
  offset: number;
  isLoading: boolean;
}

export interface SearchPlayerStateWithComputedProps extends SearchPlayerState {
  numberOfTracks: number;
  filteredList: Track[];
  isEmpty: boolean;
}

export type SearchNextPayload = NextHref;

export const REQUEST_QUERY_TRACKS = 'REQUEST_QUERY_TRACKS';
export const RECEIVED_QUERY_TRACKS = 'RECEIVED_QUERY_TRACKS';

export const SET_NEXT_TRACKLIST_STATE = 'SET_NEXT_TRACKLIST_STATE';
export const SET_NEXT_REQUEST_OFFSET = 'SET_NEXT_REQUEST_OFFSET';
export const SET_TRACK_READY_STATUS = 'SET_TRACK_READY_STATUS';
export const CLEAR_CURRENT_SEARCH_DATA = 'CLEAR_CURRENT_SEARCH_DATA';

interface RequestQueryTracks {
  type: typeof REQUEST_QUERY_TRACKS;
  payload: boolean;
}

interface ReceivedQueryTracks {
  type: typeof RECEIVED_QUERY_TRACKS;
  payload: Track[];
}

interface SetNextTracklistState {
  type: typeof SET_NEXT_TRACKLIST_STATE;
  payload: SearchNextPayload;
}

interface SetNextRequestOffset {
  type: typeof SET_NEXT_REQUEST_OFFSET;
  payload: APISearchParams;
}

interface SetTrackReadyStatus {
  type: typeof SET_TRACK_READY_STATUS;
  payload: boolean;
}

interface ClearCurrentSearchData {
  type: typeof CLEAR_CURRENT_SEARCH_DATA;
}

export type SearchPlayerActionTypes =
  | RequestQueryTracks
  | ReceivedQueryTracks
  | SetNextTracklistState
  | SetNextRequestOffset
  | SetTrackReadyStatus
  | ClearCurrentSearchData;
