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
    currentTrack?: Object,
    soundCloudAudio?: Object
};

export default class PlayPause extends Component<Props, {}> {
    componentDidMount() {
        const { id, currentTrack, soundCloudAudio } = this.props;

        if (currentTrack && soundCloudAudio && currentTrack.id === id) {
            soundCloudAudio.play();
        }
    }

    render() {
        return (
            <PlayPauseWrapper>
                <PlayButton className={playPauseClassName(this.props)} {...this.props} seekingIcon={<FaClockO />} />
            </PlayPauseWrapper>
        );
    }
}
