// @flow

import {
    ADD_TRACK_TO_QUEUE,
    DELETE_TRACK_FROM_QUEUE,
    SET_CURRENT_TRACK,
    SET_NEXT_TRACK,
    INCREMENT_REPEAT_TIMES,
    DECREMENT_REPEAT_TIMES,
    UPDATE_POINTER_ON_DELETE
} from './actions';

type Payload = {
    id: number,
    nextTrackID: number
};

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

export const setCurrentTrack = (trackID: number) => {
    return {
        type: SET_CURRENT_TRACK,
        trackID
    };
};

export const setNextTrack = (trackID: number) => {
    return {
        type: SET_NEXT_TRACK,
        trackID
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

export const updatePointerOnDelete = (payload: Payload) => {
    return {
        type: UPDATE_POINTER_ON_DELETE,
        ...payload
    };
};