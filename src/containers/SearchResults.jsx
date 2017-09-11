import { connect } from 'react-redux';
import { addTrack, deleteTrack } from '../actionCreators.js';
import { isInArray } from '../utils';
import SearchResultsView from '../components/SearchResultsView';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'Add',
        secondAction: 'Delete',
        results: ownProps.results.filter(trackInResults => {
            return !isInArray(trackInResults, state.tracks, 'id');
        })
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            dispatch(addTrack(track));
        },
        onSecondAction: ({ id }) => {
            dispatch(deleteTrack(id));
        }
    };
};

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResultsView);

export default SearchResults;
