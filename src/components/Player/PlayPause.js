// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import styledClass from 'styled-classnames';
import { PlayButton } from 'react-soundplayer/components';
import { FaClockO } from 'react-icons/lib/fa';
import { BASE_COLOR } from '../../theme';

const playPauseClassName = styledClass`
    width: 100%;
    height: 100%;
    min-width: 20px;
    min-height: 20px;
    padding: 3px;
    cursor: pointer;
    background-size: cover;
    background-repeat: round;
    background: ${props =>
        props.artwork ? `url(${props.artwork})` : `url(${props.avatar})`};
    color: ${props => props.color};
    border: none;

    & > svg {
        width: 40%;
        height: 70%;
    }
`;

const WaitForReadyWrapper = styled.div`
    width: 100%;
    height: 100%;
    color: ${BASE_COLOR};
    border: none;

    & > svg {
        width: 100%;
        height: 100%;
    }
`;

const PlainCover = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: round;
    background: ${props =>
        props.artwork ? `url(${props.artwork})` : `url(${props.avatar})`};
    border: none;
`;

const PlayPauseWrapper = styled.section`
    flex: 0 100px;
    height: 100%;
`;

type Props = {
    color: string,
    background: string,
    track: Object,
    onReadyToPlay: Function,
    currentTrackID?: number,
    isReadyToPlay: boolean,
    isPurePlaylist: boolean,
    playing?: boolean,
    numberOfTracks?: number,
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

    _checkIfReady = () => {
        const { soundCloudAudio, track, onReadyToPlay } = this.props;

        if (soundCloudAudio && soundCloudAudio.play) {
            const { id } = track;
            let readyCheckInterval = setInterval(() => {
                const { duration } = soundCloudAudio;

                if (duration > 0) {
                    clearInterval(readyCheckInterval);
                    onReadyToPlay(id);
                }
            }, TIME_TO_CHECK_TRACK_READY_INTERVAL);
        }
    };

    _playCurrentTrack = (callback: Function = () => {}) => {
        const { currentTrackID, soundCloudAudio, track, playing } = this.props;
        const { id } = track;

        if (
            currentTrackID &&
            soundCloudAudio &&
            soundCloudAudio.play &&
            currentTrackID === id
        ) {
            if (!playing) {
                let readyCheckInterval = setInterval(() => {
                    const { duration } = soundCloudAudio;

                    if (duration > 0) {
                        soundCloudAudio.play();
                        clearInterval(readyCheckInterval);
                    }
                }, TIME_TO_CHECK_TRACK_READY_INTERVAL);
            }
        }
    };

    componentWillUnmount() {
        const { soundCloudAudio, numberOfTracks } = this.props;

        if (soundCloudAudio && soundCloudAudio.stop) {
            soundCloudAudio.stop();
        }
    }

    componentDidMount = () => {
        this._checkIfReady();
    };

    componentDidUpdate(nextProps: Props, nextState: Object) {
        const { currentTrackID } = this.props;

        if (currentTrackID) {
            this._playCurrentTrack();
        }
    }

    render() {
        const {
            track,
            color,
            isReadyToPlay,
            currentTrackID,
            isPurePlaylist
        } = this.props;
        const { artwork_url: artwork, user: { avatar_url: avatar } } = track;
        const classNameProps = {
            artwork,
            avatar,
            color
        };

        let toggleWaitPlayButton = (
            <WaitForReadyWrapper {...this.props}>
                <FaClockO />
            </WaitForReadyWrapper>
        );

        if ((isReadyToPlay && isPurePlaylist) || currentTrackID === track.id) {
            toggleWaitPlayButton = (
                <PlayButton
                    onTogglePlay={this._handleTogglePlay}
                    className={playPauseClassName(classNameProps)}
                    {...this.props}
                    seekingIcon={<FaClockO />}
                />
            );
        } else if (isReadyToPlay && !isPurePlaylist) {
            toggleWaitPlayButton = <PlainCover {...classNameProps} />;
        }

        return <PlayPauseWrapper>{toggleWaitPlayButton}</PlayPauseWrapper>;
    }
}
