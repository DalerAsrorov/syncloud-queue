// @flow

import React from 'react';
import styled from 'styled-components';
import SearchControl from '../containers/SearchControl';
import PlaylistControl from '../containers/PlaylistControl';

const BaseWrapper = styled.div`
    height: 100%;
    width: 100%;
    background: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    background: transparent;
`;

const PlaylistWrapper = styled.section`
    padding: 10px;
    flex: 400px 0;
    background: #fff;
`;
// @flow

const SearchControlWrapper = styled.section`
    padding: 10px;
    flex: 1;
    margin-left: 10px;
    background: #fff;
`;

const BaseView = (props: {}) => (
    <BaseWrapper>
        <PlaylistWrapper>
            <PlaylistControl />
        </PlaylistWrapper>
        <SearchControlWrapper>
            <SearchControl />
        </SearchControlWrapper>
    </BaseWrapper>
);

export default BaseView;
