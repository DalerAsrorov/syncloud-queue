// @flow

import React from 'react';
import styled from 'styled-classnames';
import { Timer as TimerBar } from 'react-soundplayer/components';

const timerClassName = styled`
    cursor: pointer;
    color: ${props => props.color};
    text-align: right;
    font-size: 14px;
`;

type Props = {
    color: string
};

const Timer = (props: Props) => <TimerBar className={timerClassName(props)} {...props} />;

export default Timer;
