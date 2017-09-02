// @flow

import React, { Component } from 'react';
import { PlayButton } from 'react-soundplayer/components';

export default class PlayPause extends Component<SCProps, {}> {
    _handlePlaying = event => {
        const { playing, soundCloudAudio } = this.props;

        console.log('Event _handlePlaying', event);

        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
        }
    };

    _handleSeeking = event => {
        console.log('Event seeking:', event);
    };

    render() {
        return <PlayButton {...this.props} />;
    }
}
