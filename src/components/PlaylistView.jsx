// @flow

import React from 'react';
import SearchResultsView from './SearchResultsView';

const CHAR_LIMIT = 28;

const PlaylistView = (props: {
    results: Array<Object>,
    firstAction: string,
    firstActionColor: string,
    onFirstAction: Function
}) => (
    <div>
        <SearchResultsView
            results={props.results}
            isLoading={false}
            firstAction={props.firstAction}
            firstActionColor={props.firstActionColor}
            onFirstAction={props.onFirstAction}
            charLimit={CHAR_LIMIT}
        />
    </div>
);

export default PlaylistView;
