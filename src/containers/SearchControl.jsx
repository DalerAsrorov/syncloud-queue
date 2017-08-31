import React, { Component } from 'react';
import SearchView from '../components/SearchView';

export default class SearchControl extends Component {
	state = {
		foundTracks: []
	};

	_handleSearchStart = searchTerm => {
		if (searchTerm.length !== 0) {
			console.log('Make a get request here please');
		}
	};

	render() {
		const { foundTracks } = this.state;

		return <SearchView onSearchStart={this._handleSearchStart} results={foundTracks} />;
	}
}
