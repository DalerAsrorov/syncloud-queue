// @flow

import React, { Component } from 'react';
import SearchView from '../components/SearchView';

type State = {
	foundTracks: Array<Object>
};

export default class SearchControl extends Component<State> {
	state = {
		foundTracks: []
	};

	_handleSearchStart = (searchTerm: String) => {
		if (searchTerm.length !== 0) {
			console.log('Make a get request here please');
		}
	};

	render() {
		const { foundTracks } = this.state;

		return <SearchView onSearchStart={this._handleSearchStart} results={foundTracks} />;
	}
}
