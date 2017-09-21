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
    currentTrack?: Object,
    nextTrackID?: number,
    secondAction?: string,
    onSecondAction?: Function,
    onNextTrack?: Function
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
                currentTrack={props.currentTrack}
                queueIsEmpty={props.queueIsEmpty}
                nextTrackID={props.nextTrackID}
                onNextTrack={props.onNextTrack}
            />
        </SearchResultsWrapper>
    );
};

export default SearchResultsView;
