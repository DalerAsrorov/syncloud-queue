// @flow

import React from 'react';
import styled from 'styled-classnames';
import { Progress as ProgressBar } from 'react-soundplayer/components';

const progressClassName = styled`
    cursor: pointer;
    width: 100%;
    height: 10px;
    background: ${props => props.background};

    & > div {
        background: ${props => props.color};
        height: 100%;
        transition: width .2s ease-in;
    }
`;

type Props = {
    color: string,
    background: string,
    track: Object,
    // this way of getting duration is preferred
    // as it is already converted from ms.
    duration?: number,
    nextTrackID?: number,
    currentTime?: number,
    onNextTrack?: Function,
    soundCloudAudio?: Object
};

class Progress extends React.PureComponent<Props, {}> {
    _handleChange = () => {
        console.log('changing');
    };

    _checkForTrackEnding = () => {
        let { duration, currentTime, onNextTrack, nextTrackID, soundCloudAudio } = this.props;

        if (soundCloudAudio && duration && currentTime && onNextTrack && nextTrackID) {
            duration = Math.floor(duration);
            currentTime = Math.floor(currentTime);

            console.log(duration, currentTime);
            if (duration !== 0 && duration === currentTime) {
                soundCloudAudio.pause();
                onNextTrack(nextTrackID);
            }
        }
    };

    render() {
        this._checkForTrackEnding();

        return <ProgressBar onChange={this._handleChange} className={progressClassName(this.props)} {...this.props} />;
    }
}

export default Progress;
