// @flow

import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    float: right;
    display: flex;

    & > button {
        background: transparent;
        color: ${props => props.color};
        border: none;
        outline: none;
        font-size: 1em;
        padding: 0;

        & > svg {
            vertical-align: baseline !important;
        }
    }
`;

export default ButtonWrapper;
