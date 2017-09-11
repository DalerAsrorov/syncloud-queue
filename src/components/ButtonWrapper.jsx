// @flow

import React from 'react';
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    float: right;

    & > button {
        background: transparent;
        color: ${props => props.color};
        border: none;
        outline: none;
        font-size: 1em;
        padding: 0;
    }
`;

export default ButtonWrapper;
