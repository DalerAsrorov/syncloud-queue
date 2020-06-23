import { Track } from './SC';

export interface MainPlayerState {
  tracklist: Track[];
  currentTrackId: Track['id'] | null;
}

export interface MainPlayerStateWithComputedProps extends MainPlayerState {
  numberOfTracks: number;
  isEmpty: boolean;
}

export const ADD_TRACK_TO_QUEUE = 'ADD_TRACK_TO_QUEUE';
export const DELETE_TRACK_FROM_QUEUE = 'DELETE_TRACK_FROM_QUEUE';
export const SET_CURRENT_TRACK_ID = 'SET_CURRENT_TRACK_ID';

interface AddTrackToQueue {
  type: typeof ADD_TRACK_TO_QUEUE;
  payload: Track;
}

interface DeleteTrackFromQueue {
  type: typeof DELETE_TRACK_FROM_QUEUE;
  payload: Track['id'];
}

interface SetCurrentTrackId {
  type: typeof SET_CURRENT_TRACK_ID;
  payload: Track['id'];
}

export type MainPlayerActionTypes =
  | AddTrackToQueue
  | DeleteTrackFromQueue
  | SetCurrentTrackId;
