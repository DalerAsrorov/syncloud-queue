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

export default class Progress extends Component<Props, {}> {
    render() {
        return <TimerBar className={timerClassName(this.props)} {...this.props} />;
    }
}
