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
        numberOfTracks: state.tracks.length,
        currentTrackID: state.currentTrack,
        charLimit: 26,
        isPurePlaylist: false,
        queueIsEmpty: state.tracks.length === 0
    };
};

type DeletePayload = {
    id: number,
    nextTrackID: number,
    currentTrackID: number,
    numberOfTracks: number
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            dispatch(deleteTrack(track.id));
        },

        onNextTrack: (nextTrackID: number) => {
            dispatch(setCurrentTrack(nextTrackID));
        },

        onAfterDelete: (deletePayload: DeletePayload) => {
            const { id, nextTrackID, currentTrackID, numberOfTracks } = deletePayload;

            const infoForUpdate = {
                id,
                nextTrackID
            };

            dispatch(updatePointerOnDelete(infoForUpdate));

            debugger;

            if (currentTrackID === id) {
                console.log(numberOfTracks);
                if (numberOfTracks === 1) {
                    console.log('setting id to -1');
                    dispatch(setCurrentTrack(-1));
                } else {
                    dispatch(setCurrentTrack(nextTrackID));
                }
            }
        }
    };
};

const PlaylistControl = connect(mapStateToProps, mapDispatchToProps)(PlaylistView);

export default PlaylistControl;
