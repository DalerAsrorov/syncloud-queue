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
    currentTrackID?: number,
    onNextTrack?: Function,
    onTrackEnd?: Function,
    soundCloudAudio?: Object
};

class Progress extends React.PureComponent<Props, {}> {
    _checkForTrackEnding = (nextTrackID: number) => {
        let { track, duration, currentTime, onNextTrack, onTrackEnd, soundCloudAudio } = this.props;

        if (soundCloudAudio && duration && currentTime && onNextTrack) {
            duration = Math.floor(duration);
            currentTime = Math.floor(currentTime);

            if (nextTrackID && duration !== 0 && duration === currentTime) {
                onNextTrack(nextTrackID);

                if (onTrackEnd) {
                    onTrackEnd(track);
                }
            }
        }
    };

    componentDidUpdate = (nextProps: Props, nextState: Object) => {
        const { nextTrackID } = nextProps;

        if (nextTrackID) {
            this._checkForTrackEnding(nextTrackID);
        }
    };

    render() {
        return <ProgressBar className={progressClassName(this.props)} {...this.props} />;
    }
}

export default Progress;
