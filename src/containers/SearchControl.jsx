// @flow

import React, { Component } from 'react';
import SearchView from '../components/SearchView';
import { searchQuery } from '../api';

type State = {
	foundTracks: Array<Object>
};

export default class SearchControl extends Component<{}, State> {
	state = {
		foundTracks: []
	};

	_handleSearchStart = (searchTerm: String) => {
		if (searchTerm.length !== 0) {
			searchQuery(searchTerm)
				.then(data => console.log(data))
				.catch(error => console.error(error));
		}
	};

	render() {
		const { foundTracks } = this.state;

		return <SearchView onSearchStart={this._handleSearchStart} results={foundTracks} />;
	}
}
