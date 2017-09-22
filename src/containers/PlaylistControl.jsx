// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrack, setCurrentTrack } from '../actionCreators.js';
import PlaylistView from '../components/PlaylistView';
import { NEGATIVE } from '../theme';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'FaMinusSquare',
        firstActionColor: NEGATIVE,
        results: state.tracks,
        currentTrackID: state.currentTrack,
        charLimit: 26,
        queueIsEmpty: false
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            dispatch(deleteTrack(track.id));
        },

        onNextTrack: (nextTrackID: number) => {
            dispatch(setCurrentTrack(nextTrackID));
        }
    };
};

const PlaylistControl = connect(mapStateToProps, mapDispatchToProps)(PlaylistView);

export default PlaylistControl;
