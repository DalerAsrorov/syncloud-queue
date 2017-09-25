// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import styledClass from 'styled-classnames';
import { PlayButton } from 'react-soundplayer/components';
import FaClockO from 'react-icons/lib/fa/clock-o';

const playPauseClassName = styledClass`
    width: 100%;
    height: 100%;
    min-width: 20px;
    min-height: 20px;
    padding: 3px;
    cursor: pointer;
    background-size: cover;
    background-repeat: round;
    background: ${props => (props.artwork ? `url(${props.artwork})` : `url(${props.avatar})`)};
    color: ${props => props.color};
    border: none;

    & > svg {
        width: 40%;
        height: 70%;
    }
`;

const PlayPauseWrapper = styled.section`
    flex: 0 100px;
    height: 100%;
`;

type Props = {
    color: string,
    background: string,
    track: Object,
    currentTrackID?: number,
    playing?: boolean,
    soundCloudAudio?: Object
};

const TIME_TO_CHECK_TRACK_READY_INTERVAL = 10;

export default class PlayPause extends PureComponent<Props, {}> {
    _handleTogglePlay = () => {
        const { soundCloudAudio, playing } = this.props;

        if (playing && soundCloudAudio) {
            soundCloudAudio.pause();
        } else if (!playing && soundCloudAudio) {
            soundCloudAudio.play();
        }
    };

    _playCurrentTrack = (callback: Function = () => {}) => {
        const { currentTrackID, soundCloudAudio, track, playing } = this.props;
        const { id } = track;

        // New solution to `noReady` prop function - 09/24/2017:
        // set interval to periodically check whether duration property
        // is available. If it is available, that means the track
        // is ready to play.
        if (currentTrackID && soundCloudAudio && soundCloudAudio.play && currentTrackID === id) {
            if (!playing) {
                let readyCheckInterval = setInterval(() => {
                    const { audio, audio: { readyState: trackState }, duration } = soundCloudAudio;

                    if (duration > 0) {
                        soundCloudAudio.play();
                        clearInterval(readyCheckInterval);
                    }
                }, TIME_TO_CHECK_TRACK_READY_INTERVAL);
            }
        }
    };

    componentDidMount() {
        this._playCurrentTrack();
    }

    componentDidUpdate(nextProps: Props, nextState: Object) {
        const { currentTrackID } = this.props;

        if (currentTrackID) {
            this._playCurrentTrack();
        }
    }

    render() {
        const { track, color } = this.props;
        const { artwork_url: artwork, user: { avatar_url: avatar } } = track;

        const classNameProps = {
            artwork,
            avatar,
            color
        };

        return (
            <PlayPauseWrapper>
                <PlayButton
                    onTogglePlay={this._handleTogglePlay}
                    className={playPauseClassName(classNameProps)}
                    {...this.props}
                    seekingIcon={<FaClockO />}
                />
            </PlayPauseWrapper>
        );
    }
}
