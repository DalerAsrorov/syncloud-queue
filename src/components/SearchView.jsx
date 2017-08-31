// @flow

import React, { PureComponent } from 'react';
import Search from './Search';
import SearchResults from './SearchResults';

export default class SearchView extends PureComponent {
	render() {
		const { onSearchStart, results } = this.props;

		return (
			<div>
				<Search onSearchStart={onSearchStart} />
				<SearchResults results={results} />
			</div>
		);
	}
}
