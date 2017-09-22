// @flow

import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';

type State = {
    searchTerm: string
};

type Props = {
    onSearchStart: Function,
    onLoaderShow: Function
};

export default class Search extends Component<Props, State> {
    state = {
        searchTerm: ''
    };

    _handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        const { onSearchStart, onLoaderShow } = this.props;

        if (onSearchStart) {
            onLoaderShow();
            onSearchStart(searchTerm);
        }
    };

    _updateSearchFieldState = (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        return <SearchForm onSubmit={this._handleSubmit} onChange={this._updateSearchFieldState} />;
    }
}
