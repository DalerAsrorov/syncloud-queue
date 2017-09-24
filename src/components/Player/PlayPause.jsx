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
    soundCloudAudio?: Object,
    playing?: boolean,
    soundCloudAudio?: Object
};

export default class PlayPause extends PureComponent<Props, {}> {
    _handleTogglePlay = () => {
        const { soundCloudAudio, playing } = this.props;

        console.log('playing', playing);

        if (playing && soundCloudAudio) {
            soundCloudAudio.pause();
        } else if (!playing && soundCloudAudio) {
            soundCloudAudio.play();
        }
    };

    _playCurrentTrack = (callback: Function = () => {}) => {
        const { currentTrackID, soundCloudAudio, track } = this.props;
        const { id } = track;
        // currently onload method doesn't work in
        // making sure that the track is loaded before
        // it is played. Temporary solution is to
        // have a time out.
        if (currentTrackID && soundCloudAudio && currentTrackID === id) {
            console.log(`Should play ${id}`);
            setTimeout(function() {
                soundCloudAudio.play();
                callback();
            }, 3000);
        }
    };

    componentDidMount() {
        this._playCurrentTrack();
    }

    componentDidUpdate() {
        this._playCurrentTrack();
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
