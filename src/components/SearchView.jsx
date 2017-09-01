// @flow

import React from 'react';
import Search from './Search';
import SearchResults from './SearchResults';

const SearchView = (props: { onSearchStart: Function, results: Array<Object> }) => (
	<div>
		<Search onSearchStart={props.onSearchStart} />
		<SearchResults results={props.results} />
	</div>
);

export default SearchView;
