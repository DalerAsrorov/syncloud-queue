// @flow

import React, { Component } from 'react';
import SearchView from '../components/SearchView';
import { searchQuery } from '../api';
import { connect } from 'react-redux';

type State = {
    tracks: Array<Object>,
    isLoading: boolean
};

export default class SearchControl extends Component<{}, State> {
    state = {
        tracks: [],
        isLoading: false
    };

    _handleSearchStart = (searchTerm: String) => {
        if (searchTerm.trim().length !== 0) {
            searchQuery(searchTerm, 150)
                .then(tracks => this.setState({ isLoading: false, tracks }))
                .catch(error => console.error(error));
        }
    };

    _handleLoaderShow = () => {
        this.setState({
            isLoading: true
        });
    };

    _handleFirstAction = (track: Object) => {
        console.log('track', track.id);
    };

    _handleSecondAction = (track: Object) => {
        console.log('track', track.id);
    };

    render() {
        const { tracks, isLoading } = this.state;

        return (
            <SearchView
                isLoading={isLoading}
                onLoaderShow={this._handleLoaderShow}
                onSearchStart={this._handleSearchStart}
                results={tracks}
            />
        );
    }
}
