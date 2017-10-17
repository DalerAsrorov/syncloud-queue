import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeadphones } from 'react-icons/lib/fa';
import { BASE_COLOR, COVER_COLOR } from '../theme';

const loaderAnimation = keyframes`
    from {
        transform: rotate(0deg)
    } 
    
    to {
        transform: rotate(360deg)
    }
`;

const LoaderWrapper = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;
    height: 350px;
    margin: 0 auto;
    color: ${COVER_COLOR};

    & > * {
        width: 100%;
        height: 100%;
    }
`;

const LoaderDescription = styled.h2`
    margin: 0;
    font-weight: 400;
    color: ${BASE_COLOR};
`;

const LoaderIconWrapper = styled.div`
    font-size: 5em;
    line-height: 1.5;
    animation: ${loaderAnimation} infinite 1.5s linear;

    & > svg {
        vertical-align: baseline !important;
    }
`;

const Loader = (props: { loadDescription: string }) => (
    <LoaderWrapper>
        <LoaderIconWrapper>
            <FaHeadphones />
        </LoaderIconWrapper>
        <LoaderDescription>{props.loadDescription}</LoaderDescription>
    </LoaderWrapper>
);

export default Loader;
