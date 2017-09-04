// @flow

import React, { Component } from 'react';
import SearchResultsView from '../components/SearchResultsView';
import Loader from '../components/Loader';

type Props = {
    results: Array<Object>,
    isLoading: boolean
};

export default class SearchResults extends Component<Props, {}> {
    render() {
        const { results, isLoading } = this.props;

        if (isLoading) {
            return <Loader loadDescription="Loading tracks..." />;
        }

        return <SearchResultsView results={results} />;
    }
}
