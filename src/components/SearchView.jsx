// @flow

import React from 'react';
import styled from 'styled-components';
import Search from '../containers/Search';
import SearchResults from './SearchResultsView';

const SearchViewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SearchWrapper = styled.div`flex: 50px 0;`;
const SearchResultsWrapper = styled.div`
	flex: 1;
	height: 100%;
	min-height: 500px;
	border-radius: 0 !important;
	border: 1px solid #ddd;
`;

const SearchView = (props: { onSearchStart: Function, results: Array<Object> }) => (
	<SearchViewWrapper>
		<SearchWrapper>
			<Search onSearchStart={props.onSearchStart} />
		</SearchWrapper>
		<SearchResultsWrapper>
			<SearchResults results={props.results} />
		</SearchResultsWrapper>
	</SearchViewWrapper>
);

export default SearchView;
