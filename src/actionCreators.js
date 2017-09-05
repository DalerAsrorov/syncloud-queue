// @flow

import { ADD_TRACK_TO_QUEUE, DELETE_TRACK_FROM_QUEUE, INCREMENT_REPEAT_TIMES, DECREMENT_REPEAT_TIMES } from './actions';

export const addTrack = (track: Object) => {
    return {
        type: ADD_TRACK_TO_QUEUE,
        repeatTimes: 0,
        id: track.id,
        track
    };
};

export const deleteTrack = (id: number) => {
    return {
        type: DELETE_TRACK_FROM_QUEUE,
        id
    };
};

export const incrementRepeatTimes = (id: number) => {
    return {
        type: INCREMENT_REPEAT_TIMES,
        id
    };
};

export const decrementRepeatTimes = (id: number) => {
    return {
        type: DECREMENT_REPEAT_TIMES,
        id
    };
};
