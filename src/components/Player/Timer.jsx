// @flow

import React, { Component } from 'react';
import styled from 'styled-classnames';
import { Timer as TimerBar } from 'react-soundplayer/components';

const timerClassName = styled` 
    cursor: pointer;
    color: ${props => props.color}
`;

type Props = {
    color: string
};

const Timer = (props: Props) => <TimerBar className={timerClassName(props)} {...props} />;

export default Timer;
