// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrack } from '../actionCreators.js';
import PlaylistView from '../components/PlaylistView';
import { NEGATIVE } from '../theme';

const mapStateToProps = (state, ownProps) => {
    return {
        firstAction: 'FaMinusSquare',
        firstActionColor: NEGATIVE,
        tracks: state.tracks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFirstAction: (track: Object) => {
            dispatch(deleteTrack(track.id));
        }
    };
};

const PlaylistControl = connect(mapStateToProps, mapDispatchToProps)(PlaylistView);

export default PlaylistControl;
