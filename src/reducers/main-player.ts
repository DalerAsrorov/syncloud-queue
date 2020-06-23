import {
  addTrackToQueue,
  deleteTrackFromQueue,
  nextTrackClick,
  prevTrackClick,
  setCurrentTrackId,
  ThunkMainPlayerDispatch,
} from '../actions/main-player';
import {
  ADD_TRACK_TO_QUEUE,
  DELETE_TRACK_FROM_QUEUE,
  MainPlayerActionTypes,
  MainPlayerState,
  MainPlayerStateWithComputedProps,
  SET_CURRENT_TRACK_ID,
} from '../typings/main-player-state';
import { Track } from '../typings/SC';

const INITIAL_STATE: MainPlayerState = {
  tracklist: [],
  currentTrackId: null,
};

export const mainPlayer = (
  state = INITIAL_STATE,
  action: MainPlayerActionTypes
): MainPlayerState => {
  switch (action.type) {
    case ADD_TRACK_TO_QUEUE:
      return {
        ...state,
        tracklist: [...state.tracklist, action.payload],
      };
    case DELETE_TRACK_FROM_QUEUE:
      return {
        ...state,
        tracklist: state.tracklist.filter(
          (track) => track.id !== action.payload
        ),
      };
    case SET_CURRENT_TRACK_ID:
      return {
        ...state,
        currentTrackId: action.payload,
      };
    default:
      return state;
  }
};

export interface MapMainPlayerProps {
  isEmpty: MainPlayerStateWithComputedProps['isEmpty'];
  numberOfTracks: MainPlayerStateWithComputedProps['numberOfTracks'];
  currentTrack: Track;
  currentTrackIndex: number;
  clientId?: string;
}

export const mapMainPlayerStateToProps = (state: any) => ({
  mainPlayer: state.mainPlayer,
  searchPlayer: state.searchPlayer,
  search: state.search,
  isEmpty: state.mainPlayer.tracklist.length === 0,
  numberOfTracks: state.mainPlayer.tracklist.length,
  currentTrack: state.mainPlayer.tracklist.find(
    (track: Track) => track.id === state.mainPlayer.currentTrackId
  ),
  currentTrackIndex: state.mainPlayer.tracklist.findIndex(
    (track: Track) => track.id === state.mainPlayer.currentTrackId
  ),
});

export interface MappedMainPlayerDispatch {
  onAddTrack(track: Track): void;
  onDeleteTrack(trackId: Track['id']): void;
  onSetCurrentTrackId(trackId: Track['id']): void;
  onPrevTrackClick(currentTrackIndex: number): void;
  onNextTrackClick(currentTrackIndex: number): void;
}
export const mapMainPlayerDispatchToProps = (
  dispatch: ThunkMainPlayerDispatch
): MappedMainPlayerDispatch => ({
  onAddTrack(track: Track) {
    dispatch(addTrackToQueue(track));
  },
  onDeleteTrack(trackId: Track['id']) {
    dispatch(deleteTrackFromQueue(trackId));
  },
  onSetCurrentTrackId(trackId: Track['id']) {
    dispatch(setCurrentTrackId(trackId));
  },
  onPrevTrackClick(currentTrackIndex: number) {
    dispatch(prevTrackClick(currentTrackIndex));
  },
  onNextTrackClick(currentTrackIndex: number) {
    dispatch(nextTrackClick(currentTrackIndex));
  },
});
