// @flow

import { connect } from 'react-redux';
import { addTrack, setCurrentTrack, setNextTrack } from '../actionCreators.js';
import { isInArray, formatTrack } from '../utils';
import SearchResultsView from '../components/SearchResultsView';
import { POSITIVE } from '../theme';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'FaPlusSquare',
        firstActionColor: POSITIVE,
        charLimit: 60,
        results: ownProps.results.filter(trackInResults => {
            return !isInArray(trackInResults, state.tracks, 'id');
        }),
        queueIsEmpty: state.tracks.length === 0
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            const formattedTrack = formatTrack(track);
            dispatch(addTrack(formattedTrack));
        },

        onSecondAction: (track: Object) => {
            const formattedTrack = formatTrack(track);
            dispatch(setCurrentTrack(formattedTrack));
        },

        onSetNextTrack: ({ id: trackID }) => {
            dispatch(setNextTrack(trackID));
        }
    };
};

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsView);

export default SearchResults;
