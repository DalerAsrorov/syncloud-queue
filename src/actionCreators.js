// @flow

import { ADD_TRACK_TO_QUEUE, DELETE_TRACK_FROM_QUEUE } from './actions';

export const addTrack = (track: Object) => {
    return {
        type: ADD_TRACK_TO_QUEUE,
        repeatTimes: 0,
        track
    };
};

export const deleteTrack = (id: number) => {
    return {
        type: DELETE_TRACK_FROM_QUEUE,
        id
    };
};
