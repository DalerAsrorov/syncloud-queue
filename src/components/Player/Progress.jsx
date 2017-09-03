// @flow

import React from 'react';
import styled from 'styled-classnames';
import { Progress as ProgressBar, Icons } from 'react-soundplayer/components';

const progressClassName = styled` 
    cursor: pointer;
    width: 100%;
    height: 10px;
    background: ${props => props.background}; 
    
    & > div {
        background: ${props => props.color};
        height: 100%;
        transition: width .2s ease-in;  
    }
`;

type Props = {
    color: string,
    background: string
};

const Progress = (props: Props) => <ProgressBar className={progressClassName(props)} {...props} />;

export default Progress;
