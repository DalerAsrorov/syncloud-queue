import { EnhancedTrack } from './SC';

export interface MainPlayerState {
  tracklist: EnhancedTrack[];
  currentTrackId: EnhancedTrack['id'] | null;
}

export interface MainPlayerStateWithComputedProps extends MainPlayerState {
  numberOfTracks: number;
  isEmpty: boolean;
}

export const ADD_TRACK_TO_QUEUE = 'ADD_TRACK_TO_QUEUE';
export const DELETE_TRACK_FROM_QUEUE = 'DELETE_TRACK_FROM_QUEUE';
export const SET_CURRENT_TRACK_ID = 'SET_CURRENT_TRACK_ID';
export const SET_TRACK_READY = 'SET_TRACK_READY';

interface AddTrackToQueue {
  type: typeof ADD_TRACK_TO_QUEUE;
  payload: EnhancedTrack;
}

interface DeleteTrackFromQueue {
  type: typeof DELETE_TRACK_FROM_QUEUE;
  payload: EnhancedTrack['id'];
}

interface SetCurrentTrackId {
  type: typeof SET_CURRENT_TRACK_ID;
  payload: EnhancedTrack['id'];
}

interface SetTrackReady {
  type: typeof SET_TRACK_READY;
  payload: { trackId: EnhancedTrack['id']; isReady: EnhancedTrack['isReady'] };
}

export type MainPlayerActionTypes =
  | AddTrackToQueue
  | DeleteTrackFromQueue
  | SetCurrentTrackId
  | SetTrackReady;
