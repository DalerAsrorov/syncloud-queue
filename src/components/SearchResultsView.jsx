// @flow

import React from 'react';
import styled from 'styled-components';
import Playlist from './Playlist';
import Loader from './Loader';

const SearchResultsWrapper = styled.div`
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 0 !important;
`;

const SearchResultsView = (props: {
    results: Array<Object>,
    isLoading: boolean,
    firstAction: string,
    firstActionColor: string,
    onFirstAction: Function,
    charLimit: number,
    queueIsEmpty: boolean,
    isPurePlaylist?: boolean,
    currentTrackID?: number,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function,
    onAfterDelete?: Function
}) => {
    const { results, isLoading, ...restProps } = props;

    if (isLoading) {
        return <Loader loadDescription="Loading tracks..." />;
    }

    return (
        <SearchResultsWrapper>
            <Playlist tracks={results} {...restProps} />
        </SearchResultsWrapper>
    );
};

export default SearchResultsView;
