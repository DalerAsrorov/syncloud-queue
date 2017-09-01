// @flow

import React from 'react';
import styled from 'styled-components';
import Playlist from './Playlist';

const SearchResultsWrapper = styled.div`
	display: block;
	height: 100%;
	border-radius: 0 !important;
`;

const SearchResultsView = (props: { results: Array<Object> }) => (
	<SearchResultsWrapper>
		<Playlist tracks={props.results} />
	</SearchResultsWrapper>
);

export default SearchResultsView;
