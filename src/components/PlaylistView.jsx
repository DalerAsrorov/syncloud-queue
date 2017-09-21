// @flow

import React from 'react';
import SearchResultsView from './SearchResultsView';

const CHAR_LIMIT = 28;

const PlaylistView = (props: {
    results: Array<Object>,
    currentTrackID: number,
    nextTrackID: number,
    queueIsEmpty: boolean,
    firstAction: string,
    firstActionColor: string,
    onFirstAction: Function,
    onNextTrack: Function
}) => (
    <SearchResultsView
        results={props.results}
        currentTrackID={props.currentTrackID}
        nextTrackID={props.nextTrackID}
        isLoading={false}
        firstAction={props.firstAction}
        firstActionColor={props.firstActionColor}
        onFirstAction={props.onFirstAction}
        charLimit={CHAR_LIMIT}
        queueIsEmpty={props.queueIsEmpty}
        onNextTrack={props.onNextTrack}
    />
);

export default PlaylistView;
