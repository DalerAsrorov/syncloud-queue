// @flow

import React from 'react';
import SearchResultsView from './SearchResultsView';

const PlaylistView = (props: {
    results: Array<Object>,
    currentTrackID: number,
    nextTrackID: number,
    queueIsEmpty: boolean,
    firstAction: string,
    firstActionColor: string,
    charLimit: number,
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
        charLimit={props.charLimit}
        queueIsEmpty={props.queueIsEmpty}
        onNextTrack={props.onNextTrack}
    />
);

export default PlaylistView;
