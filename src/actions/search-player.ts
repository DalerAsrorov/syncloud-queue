import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { searchTracksApi } from '../api/soundcloud';
import { RootState } from '../reducers/index';
import { MainPlayerActionTypes } from '../typings/main-player-state';
import { APISearchParams, Track } from '../typings/SC';
import {
  CLEAR_CURRENT_SEARCH_DATA,
  RECEIVED_QUERY_TRACKS,
  REQUEST_QUERY_TRACKS,
  SearchNextPayload,
  SearchPlayerActionTypes,
  SET_NEXT_REQUEST_OFFSET,
  SET_NEXT_TRACKLIST_STATE,
  SET_TRACK_READY_STATUS,
} from '../typings/search-player-state';

export const requestQueryTracks = (
  isLoading: boolean
): SearchPlayerActionTypes => ({
  type: REQUEST_QUERY_TRACKS,
  payload: isLoading,
});

export const receivedQueryTracks = (
  tracks: Track[]
): SearchPlayerActionTypes => ({
  type: RECEIVED_QUERY_TRACKS,
  payload: tracks,
});

export const setNextTracklistState = (
  nextPayload: SearchNextPayload
): SearchPlayerActionTypes => ({
  type: SET_NEXT_TRACKLIST_STATE,
  payload: nextPayload,
});

export const setNextRequestOffset = (
  params: APISearchParams
): SearchPlayerActionTypes => ({
  type: SET_NEXT_REQUEST_OFFSET,
  payload: params,
});

export const setTrackReadyStatus = (
  isReady: boolean
): SearchPlayerActionTypes => ({
  type: SET_TRACK_READY_STATUS,
  payload: isReady,
});

export const clearCurrentSearchData = (): SearchPlayerActionTypes => ({
  type: CLEAR_CURRENT_SEARCH_DATA,
});

export type ThunkSearchPlayerDispatch = ThunkDispatch<
  RootState,
  undefined,
  SearchPlayerActionTypes | MainPlayerActionTypes
>;

export const fetchSearchedTracks = (
  params: APISearchParams,
  isFetchMoreRequest: boolean
): ThunkAction<void, RootState, undefined, SearchPlayerActionTypes> => async (
  dispatch: ThunkSearchPlayerDispatch,
  getState
) => {
  let { searchPlayer: lastRequest } = getState();
  const isOutOfTracks = lastRequest.isLoading && !lastRequest.nextHref;

  if (!isOutOfTracks) {
    dispatch(requestQueryTracks(true));

    if (!isFetchMoreRequest) {
      dispatch(clearCurrentSearchData());
    }

    let { searchPlayer: currRequest, search } = getState();

    searchTracksApi({
      ...params,
      offset: currRequest.offset,
      [search.queryType]: search.query.trim(),
    }).then((searchPayload) => {
      const { collection, next_href } = searchPayload;
      const nextTracks = collection.map((currTrack) => {
        const artwork_url = currTrack.artwork_url
          ? currTrack.artwork_url
          : currTrack.user.avatar_url;

        return {
          ...currTrack,
          artwork_url,
        };
      });

      dispatch(receivedQueryTracks(nextTracks));
      dispatch(setNextTracklistState(next_href));
      dispatch(setNextRequestOffset(params));
      dispatch(requestQueryTracks(false));
    });
  }
};
