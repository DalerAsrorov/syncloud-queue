// @flow

import React from 'react';
import SearchResultsView from './SearchResultsView';

const PlaylistView = (props: {
    results: Array<Object>,
    currentTrackID: number,
    queueIsEmpty: boolean,
    firstAction: string,
    firstActionColor: string,
    charLimit: number,
    onFirstAction: Function,
    onNextTrack: Function,
    onAfterDelete: Function
}) => (
    <SearchResultsView
        results={props.results}
        currentTrackID={props.currentTrackID}
        isLoading={false}
        firstAction={props.firstAction}
        firstActionColor={props.firstActionColor}
        onFirstAction={props.onFirstAction}
        charLimit={props.charLimit}
        queueIsEmpty={props.queueIsEmpty}
        onNextTrack={props.onNextTrack}
        onAfterDelete={props.onAfterDelete}
    />
);

export default PlaylistView;
