// @flow

import { connect } from 'react-redux';
import { addTrack } from '../actionCreators.js';
import { isInArray, formatTrack } from '../utils';
import SearchResultsView from '../components/SearchResultsView';
import { POSITIVE } from '../theme';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'FaPlusSquare',
        firstActionColor: POSITIVE,
        charLimit: 80,
        results: ownProps.results.filter(trackInResults => {
            return !isInArray(trackInResults, state.tracks, 'id');
        })
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            const formattedTrack = formatTrack(track);
            dispatch(addTrack(formattedTrack));
        }
    };
};

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsView);

export default SearchResults;
