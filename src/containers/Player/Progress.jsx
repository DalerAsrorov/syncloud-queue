// @flow

import React, { Component } from 'react';
import styled from 'styled-classnames';
import { Progress as ProgressBar, Icons } from 'react-soundplayer/components';

const progressClassName = styled` 
    cursor: pointer;
    width: 100%;
    height: 10px;
    background: #ddd; 
    
    & > div {
        background: ${props => props.color};
        height: 100%;
        transition: width .2s ease-in;  
    }
`;

type Props = {
    color: string
};

export default class Progress extends Component<Props, {}> {
    render() {
        return <ProgressBar className={progressClassName(this.props)} {...this.props} />;
    }
}
