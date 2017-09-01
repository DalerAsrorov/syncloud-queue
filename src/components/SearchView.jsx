// @flow

import React, { PureComponent } from 'react';
import Search from './Search';
import SearchResults from './SearchResults';

const SearchView = (props: { onSearchStart: Function, results: Array<Object> }) => (
	<div>
		<Search onSearchStart={onSearchStart} />
		<SearchResults results={results} />
	</div>
);

export default SearchView;
