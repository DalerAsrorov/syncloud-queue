// @flow

import React from 'react';
import styled from 'styled-classnames';
import { PlayButton, Icons } from 'react-soundplayer/components';
import FaClockO from 'react-icons/lib/fa/clock-o';

const { NextIconSVG } = Icons;

const playPauseClassName = styled`
    width: 60px; 
    height: 60px; 
    padding: 3px; 
    cursor: pointer;
    background-color: ${props => props.background};
    color: ${props => props.color}; 
    border: none;
    border-radius: 50% !important;
    
    & > svg {
        width: 40%; 
        height: 70%; 
    }
`;

const PlayPause = (props: { color: string, background: string }) => (
    <PlayButton className={playPauseClassName(props)} {...props} seekingIcon={<FaClockO />} />
);

export default PlayPause;
