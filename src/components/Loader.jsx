import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    display: block;
    text-align: center;
`;

const Loader = (props: { loadDescription: string }) => (
    <LoaderWrapper>
        <p>{props.loadDescription}</p>
    </LoaderWrapper>
);

export default Loader;
