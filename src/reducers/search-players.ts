import { addTrackToQueue } from '../actions/main-player';
import {
  fetchSearchedTracks,
  ThunkSearchPlayerDispatch,
} from '../actions/search-player';
import { SEARCH_QUERY_TRACKS_LIMIT } from '../api/constants';
import { APISearchParams, Track } from '../typings/SC';
import {
  CLEAR_CURRENT_SEARCH_DATA,
  RECEIVED_QUERY_TRACKS,
  REQUEST_QUERY_TRACKS,
  SearchPlayerActionTypes,
  SearchPlayerState,
  SearchPlayerStateWithComputedProps,
  SET_NEXT_REQUEST_OFFSET,
  SET_NEXT_TRACKLIST_STATE,
} from '../typings/search-player-state';

const INITIAL_STATE: SearchPlayerState = {
  tracks: [],
  nextHref: undefined,
  limit: SEARCH_QUERY_TRACKS_LIMIT,
  offset: 0,
  isLoading: false,
};

export const searchPlayer = (
  state = INITIAL_STATE,
  action: SearchPlayerActionTypes
): SearchPlayerState => {
  switch (action.type) {
    case REQUEST_QUERY_TRACKS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case RECEIVED_QUERY_TRACKS:
      return {
        ...state,
        tracks: [...state.tracks, ...action.payload],
      };
    case SET_NEXT_TRACKLIST_STATE:
      return {
        ...state,
        nextHref: action.payload,
      };
    case SET_NEXT_REQUEST_OFFSET:
      const nextOffsetChunk = action.payload.limit
        ? action.payload.limit
        : SEARCH_QUERY_TRACKS_LIMIT;

      return {
        ...state,
        offset: state.offset + nextOffsetChunk,
      };
    case CLEAR_CURRENT_SEARCH_DATA:
      return {
        ...state,
        offset: INITIAL_STATE.offset,
        tracks: INITIAL_STATE.tracks,
      };
    default:
      return state;
  }
};

export interface MappedSearchPlayerProps {
  isEmpty: SearchPlayerStateWithComputedProps['isEmpty'];
  numberOfTracks: SearchPlayerStateWithComputedProps['numberOfTracks'];
  filteredList: SearchPlayerStateWithComputedProps['filteredList'];
}
export interface MappedSearchPlayerDispatch {
  onFetch(params: APISearchParams, isFetchMore?: boolean): void;
  onAddTrack(track: Track): void;
}

export interface ConnectedSearchProps
  extends MappedSearchPlayerProps,
    MappedSearchPlayerDispatch {}

export const mapSearchPlayerStateToProps = (state: any) => ({
  mainPlayer: state.mainPlayer,
  searchPlayer: state.searchPlayer,
  search: state.search,
  isEmpty: state.searchPlayer.tracks.length === 0,
  numberOfTracks: state.searchPlayer.tracks.length,
  filteredList: state.searchPlayer.tracks.filter(
    (track: Track) =>
      !state.mainPlayer.tracklist.find(
        (myTrack: Track) => myTrack.id === track.id
      )
  ),
});

export const mapDispatchSearchToProps = (
  dispatch: ThunkSearchPlayerDispatch
): MappedSearchPlayerDispatch => ({
  onFetch(params: APISearchParams, isFetchMore: boolean = false) {
    dispatch(fetchSearchedTracks(params, isFetchMore));
  },
  onAddTrack(track: Track) {
    dispatch(addTrackToQueue(track));
  },
});
