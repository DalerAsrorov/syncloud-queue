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
    currentTrackID?: number,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function,
    onSetNextTrack?: Function
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
                firstActionColor={props.firstActionColor}
                secondAction={props.secondAction}
                onSecondAction={props.onSecondAction}
                charLimit={props.charLimit}
                currentTrackID={props.currentTrackID}
                queueIsEmpty={props.queueIsEmpty}
                onNextTrack={props.onNextTrack}
                onSetNextTrack={props.onSetNextTrack}
            />
        </SearchResultsWrapper>
    );
};

export default SearchResultsView;
