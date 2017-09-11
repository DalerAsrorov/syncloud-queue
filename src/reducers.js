// @flow

import { combineReducers } from 'redux';
import { ADD_TRACK_TO_QUEUE, DELETE_TRACK_FROM_QUEUE, INCREMENT_REPEAT_TIMES, DECREMENT_REPEAT_TIMES } from './actions';

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
            console.log('state', state);
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
        default:
            return state;
    }
};

const rootReducer = combineReducers({ tracks });

export default rootReducer;
