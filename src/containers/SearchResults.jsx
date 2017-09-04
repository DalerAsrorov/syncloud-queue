// @flow

import React, { Component } from 'react';
import SearchResultsView from '../components/SearchResultsView';

type Props = {
    results: Array<Object>
};

export default class SearchResults extends Component<Props, {}> {
    render() {
        console.log('Should render');
        const { results } = this.props;

        return <SearchResultsView results={results} />;
    }
}
