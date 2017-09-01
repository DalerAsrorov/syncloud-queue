// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

type State = {
	searchTerm: string
};

type Props = {
	onSearchStart: Function
};

const SearchInput = styled.input`
	width: 100%;
	padding: 5px;
	font-size: 28px;
	border-radius: 0;
	width: -webkit-fill-available;
`;

const SearchForm = styled.form``;

export default class Search extends Component<Props, State> {
	state = {
		searchTerm: ''
	};

	_handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { searchTerm } = this.state;

		console.log(`Search term: ${searchTerm}`);
	};

	_updateSearchFieldState = (event: SyntheticInputEvent<HTMLInputElement>) => {
		this.setState({
			searchTerm: event.target.value
		});
	};

	render() {
		return (
			<div>
				<SearchForm onSubmit={this._handleSubmit}>
					<SearchInput
						onChange={this._updateSearchFieldState}
						placeholder="Search artists, playlists, tracks, and more"
						name="search"
					/>
				</SearchForm>
			</div>
		);
	}
}
