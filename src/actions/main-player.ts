import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers/index';
import {
  ADD_TRACK_TO_QUEUE,
  DELETE_TRACK_FROM_QUEUE,
  MainPlayerActionTypes,
  SET_CURRENT_TRACK_ID,
  SET_TRACK_READY,
} from '../typings/main-player-state';
import { EnhancedTrack, Track } from '../typings/SC';

export type ThunkMainPlayerDispatch = ThunkDispatch<
  RootState,
  undefined,
  MainPlayerActionTypes
>;

export const addTrackAction = (
  track: EnhancedTrack
): MainPlayerActionTypes => ({
  type: ADD_TRACK_TO_QUEUE,
  payload: track,
});

export const addTrackToQueue = (
  track: Track
): ThunkAction<void, RootState, undefined, MainPlayerActionTypes> => (
  dispatch,
  getState
) => {
  dispatch(addTrackAction({ ...track, isReady: false }));

  const { mainPlayer } = getState();

  if (mainPlayer.tracklist.length === 1) {
    dispatch(setCurrentTrackId(track.id));
  }
};

export const deleteTrackFromQueue = (
  trackId: EnhancedTrack['id']
): MainPlayerActionTypes => ({
  type: DELETE_TRACK_FROM_QUEUE,
  payload: trackId,
});

export const setCurrentTrackId = (
  trackId: EnhancedTrack['id']
): MainPlayerActionTypes => ({
  type: SET_CURRENT_TRACK_ID,
  payload: trackId,
});

export const setTrackReady = (
  trackId: EnhancedTrack['id'],
  isReady: EnhancedTrack['isReady']
): MainPlayerActionTypes => ({
  type: SET_TRACK_READY,
  payload: {
    trackId,
    isReady,
  },
});

export const nextTrackClick = (
  currentTrackIndex: number
): ThunkAction<void, RootState, undefined, MainPlayerActionTypes> => (
  dispatch,
  getState
): void => {
  const {
    mainPlayer: { tracklist },
  } = getState();

  if (currentTrackIndex + 1 < tracklist.length) {
    const prevTrack = tracklist[currentTrackIndex + 1];

    dispatch(setCurrentTrackId(prevTrack.id));
  }
};

export const prevTrackClick = (
  currentTrackIndex: number
): ThunkAction<void, RootState, undefined, MainPlayerActionTypes> => (
  dispatch,
  getState
): void => {
  const {
    mainPlayer: { tracklist },
  } = getState();

  if (currentTrackIndex !== 0) {
    const prevTrack = tracklist[currentTrackIndex - 1];

    dispatch(setCurrentTrackId(prevTrack.id));
  }
};
