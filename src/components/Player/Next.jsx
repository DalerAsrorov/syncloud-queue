import React from 'react';
import styled from 'styled-classnames';
import { NextButton } from 'react-soundplayer/components';

const nextClassName = styled`
    cursor: pointer; 
    height: 100%; 
    width: 18px; 
    color: ${props => props.color} !important; 
`;

const Next = (props: { color: string }) => <NextButton className={nextClassName(props)} {...props} />;

export default Next;
