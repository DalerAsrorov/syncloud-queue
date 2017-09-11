// @flow

import React from 'react';
import SearchResultsView from './SearchResultsView';

const PlaylistView = (props: {
    tracks: Array<Object>,
    firstAction: string,
    firstActionColor: string,
    onFirstAction: Function
}) => (
    <div>
        <SearchResultsView
            results={props.tracks}
            isLoading={false}
            firstAction={props.firstAction}
            firstActionColor={props.firstActionColor}
            onFirstAction={props.onFirstAction}
        />
    </div>
);

export default PlaylistView;
