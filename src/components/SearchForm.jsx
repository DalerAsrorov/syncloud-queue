// @flow

import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
	width: 100%;
	padding: 5px;
	font-size: 28px;
	border-radius: 0;
	width: -webkit-fill-available;
	border-radius: 0 !important;
`;

const SearchFormWrapper = styled.form``;

const SearchForm = (props: { onSubmit: Function, onChange: Function }) => (
	<SearchFormWrapper onSubmit={props.onSubmit}>
		<SearchInput onChange={props.onChange} placeholder="Search artists, playlists, tracks..." name="search" />
	</SearchFormWrapper>
);

export default SearchForm;
