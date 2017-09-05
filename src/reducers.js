// @flow

import { combineReducers } from 'redux';
import { ADD_TRACK_TO_QUEUE, DELETE_TRACK_FROM_QUEUE } from './actions';

const tracks = (state = [], action: Object) => {
    switch (action.type) {
        case ADD_TRACK_TO_QUEUE:
            return [
                ...state,
                {
                    track: action.track,
                    repeatTimes: action.repeatTimes
                }
            ];
        case DELETE_TRACK_FROM_QUEUE:
            return state.filter(({ track: { id } }) => id !== action.id);
        default:
            return state;
    }
};

const rootReducer = combineReducers({ tracks });

export default rootReducer;
