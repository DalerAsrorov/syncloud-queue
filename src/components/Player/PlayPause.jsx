// @flow

import React from 'react';
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

const PlayPause = (props: { color: string, background: string, artwork: string, avatar: string }) => (
    <PlayPauseWrapper>
        <PlayButton className={playPauseClassName(props)} {...props} seekingIcon={<FaClockO />} />
    </PlayPauseWrapper>
);

export default PlayPause;