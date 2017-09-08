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

const SearchResults = (props: {
    results: Array<Object>,
    isLoading: boolean,
    firstAction: string,
    onFirstAction: Function,
    secondAction?: string,
    onSecondAction?: Function
}) => {
    const { results, isLoading } = props;

    if (isLoading) {
        return <Loader loadDescription="Loading tracks..." />;
    }

    return (
        <SearchResultsWrapper>
            <Playlist
                tracks={results}
                firstAction={props.firstAction}
                onFirstAction={props.onFirstAction}
                secondAction={props.secondAction}
                onSecondAction={props.onSecondAction}
            />
        </SearchResultsWrapper>
    );
};

export default SearchResults;
