// @flow

import React from 'react';
import Search from '../containers/Search';
import SearchResults from './SearchResultsView';

const SearchView = (props: { onSearchStart: Function, results: Array<Object> }) => (
	<div>
		<Search onSearchStart={props.onSearchStart} />
		<SearchResults results={props.results} />
	</div>
);

export default SearchView;
