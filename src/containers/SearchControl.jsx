// @flow

import React, { Component } from 'react';
import SearchView from '../components/SearchView';
import { searchQuery } from '../api';

type State = {
	tracks: Array<Object>
};

export default class SearchControl extends Component<{}, State> {
	state = {
		tracks: []
	};

	_handleSearchStart = (searchTerm: String) => {
		if (searchTerm.length !== 0) {
			searchQuery(searchTerm)
				.then(tracks => this.setState({ tracks }))
				.catch(error => console.error(error));
		}
	};

	render() {
		const { tracks } = this.state;

		return <SearchView onSearchStart={this._handleSearchStart} results={tracks} />;
	}
}
