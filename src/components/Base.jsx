import React, { PureComponent } from 'react';
import styled from 'styled-components';

const BaseWrapper = styled.div`
	height: 100%;
	width: 100%;
	background: #fff;
	margin-top: 10px;
	display: flex;
	flex-direction: row;
	background: transparent;
`;

const PlaylistWrapper = styled.section`
	padding: 10px;
	flex: 400px 0;
	background: #fff;
`;

const SearchListWrapper = styled.section`
	padding: 10px;
	flex: 1;
	margin-left: 10px;
	background: #fff;
`;

export default class Base extends PureComponent {
	render() {
		return (
			<BaseWrapper>
				<PlaylistWrapper>Playlists will be here</PlaylistWrapper>
				<SearchListWrapper>Search and lists will be here.</SearchListWrapper>
			</BaseWrapper>
		);
	}
}
