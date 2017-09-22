// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import styledClass from 'styled-classnames';
import { PlayButton, Icons } from 'react-soundplayer/components';
import FaClockO from 'react-icons/lib/fa/clock-o';

import { BASE_COLOR } from '../../theme';

const { NextIconSVG } = Icons;

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
    id: number,
    color: string,
    background: string,
    artwork: string,
    avatar: string,
    currentTrackID?: number,
    soundCloudAudio?: Object
};

export default class PlayPause extends Component<Props, {}> {
    _playCurrentTrack = (callback: Function = () => {}) => {
        const { id, currentTrackID, soundCloudAudio } = this.props;

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
        return (
            <PlayPauseWrapper>
                <PlayButton className={playPauseClassName(this.props)} {...this.props} seekingIcon={<FaClockO />} />
            </PlayPauseWrapper>
        );
    }
}
