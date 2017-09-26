// @flow

import { connect } from 'react-redux';
import { deleteTrack, setCurrentTrack, updatePointerOnDelete } from '../actionCreators.js';
import PlaylistView from '../components/PlaylistView';
import { NEGATIVE } from '../theme';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'FaMinusSquare',
        firstActionColor: NEGATIVE,
        results: state.tracks,
        currentTrackID: state.currentTrack,
        charLimit: 26,
        queueIsEmpty: state.tracks.length === 0
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            dispatch(deleteTrack(track.id));
        },

        onNextTrack: (nextTrackID: number) => {
            dispatch(setCurrentTrack(nextTrackID));
        },

        onAfterDelete: (id: number, nextTrackID: number) => {
            const payload = {
                id,
                nextTrackID
            };

            console.log(payload);

            dispatch(updatePointerOnDelete(payload));
        }
    };
};

const PlaylistControl = connect(mapStateToProps, mapDispatchToProps)(PlaylistView);

export default PlaylistControl;
