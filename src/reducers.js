// @flow

import { combineReducers } from 'redux';
import { cloneDeep, last } from 'lodash';
import {
    ADD_TRACK_TO_QUEUE,
    DELETE_TRACK_FROM_QUEUE,
    INCREMENT_REPEAT_TIMES,
    DECREMENT_REPEAT_TIMES,
    SET_CURRENT_TRACK,
    SET_NEXT_TRACK,
    UPDATE_POINTER_ON_DELETE
} from './actions';

const tracks = (state = [], action: Object) => {
    switch (action.type) {
        case ADD_TRACK_TO_QUEUE:
            return [
                ...state,
                {
                    repeatTimes: action.repeatTimes,
                    ...action.track
                }
            ];
        case DELETE_TRACK_FROM_QUEUE:
            return state.filter(({ id }) => id !== action.id);
        case INCREMENT_REPEAT_TIMES:
            return state.map(track => {
                if (track.id === action.id) {
                    track.repeatTimes += 1;
                }
                return track;
            });
        case DECREMENT_REPEAT_TIMES:
            return state.map(track => {
                if (track.id === action.id) {
                    track.repeatTimes -= 1;
                }
                return track;
            });
        case SET_NEXT_TRACK:
            const { trackID } = action;
            let tracks = cloneDeep(state);

            if (tracks.length === 0) {
                return tracks;
            }

            let lastElement = last(tracks);
            lastElement['nextTrackID'] = trackID;

            return tracks;
        case UPDATE_POINTER_ON_DELETE:
            console.log('action', action);
            console.log('state', state);
            return state;
        default:
            return state;
    }
};

const currentTrack = (state = null, action: Object) => {
    switch (action.type) {
        case SET_CURRENT_TRACK:
            return action.trackID;
        default:
            return state;
    }
};

const rootReducer = combineReducers({ tracks, currentTrack });

export default rootReducer;
