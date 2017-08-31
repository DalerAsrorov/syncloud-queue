// @flow

import React from 'react';
import styled from 'styled-components';
import SearchControl from '../containers/SearchControl';

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
// @flow

const SearchControlWrapper = styled.section`
	padding: 10px;
	flex: 1;
	margin-left: 10px;
	background: #fff;
`;

const BaseView = () => {
	return (
		<BaseWrapper>
			<PlaylistWrapper>Playlists here</PlaylistWrapper>
			<SearchControlWrapper>
				<SearchControl />
			</SearchControlWrapper>
		</BaseWrapper>
	);
};

export default BaseView;
